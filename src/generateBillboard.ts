import tinycolor from 'tinycolor2';
import { getRandomBool, pickRandom } from './utils.ts';

interface ColorPalette {
  primary: string;
  secondary: string;
  background: string;
}

function getRandomRange(from: number, to: number): number {
  if (from >= to) {
    throw new Error("'from' value must be less than 'to' value");
  }

  // Calculate the random number within the range
  return Math.random() * (to - from) + from;
}

let boundRectIndex = 0;
const drawBoundingBox = (ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number) => {
  const colors = [
    '#f00',
    '#0f0',
    '#00f',
    '#ff0',
    '#f0f',
  ];

  const color = colors[boundRectIndex % colors.length];

  ctx.strokeStyle = color;
  ctx.strokeRect(x, y, width, height);

  boundRectIndex += 1;
}

function generateRandomComplementaryColorPalette(
  isDark: boolean
): ColorPalette {
  // Generate a random hue for the primary color
  const primaryHue = Math.floor(Math.random() * 360);
  const primaryS = isDark ? getRandomRange(60, 70) : getRandomRange(70, 90);
  const primaryL = isDark ? getRandomRange(50, 80) : getRandomRange(20, 40);

  // Calculate the complementary hue for the secondary color
  const secondaryHue = (primaryHue + 180) % 360;

  // Use the primary and secondary hues to generate hex color strings
  const primaryColor = tinycolor({ h: primaryHue, s: primaryS, l: primaryL }).toHexString();
  const secondaryColor = tinycolor({
    h: secondaryHue,
    s: 50,
    l: 60,
  }).toHexString();

  // Generate random background color based on the variant
  let backgroundColor: string;
  if(isDark) {
    // For dark variant, background has the hue of primary color and lightness is between 0-20%
    // const lightness = getRandomRange(0, 15);
    // backgroundColor = tinycolor({ h: primaryHue, s: 50, l: lightness }).toHexString();
    backgroundColor = '#000';
  }
  else {
    // For light variant, background is a random light color between 10-25% of primary color
    const lightness = getRandomRange(80, 95);
    backgroundColor = tinycolor({ h: primaryHue, s: 50, l: lightness }).toHexString();
  }

  return {
    primary: primaryColor,
    secondary: secondaryColor,
    background: backgroundColor,
  };
}


const drawPalette = (canvas: HTMLCanvasElement, palette: ColorPalette) => {
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error("Canvas 2D context not supported.");
  }

  ctx.fillStyle = palette.background;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = palette.primary;
  ctx.fillRect(20, 20, 50, 50);

  ctx.fillStyle = palette.secondary;
  ctx.fillRect(100, 20, 50, 50);
}

function renderImageInCanvas(
  canvas: HTMLCanvasElement,
  image: HTMLImageElement,
  x: number,
  y: number,
  width: number,
  height: number,
  verticalAlign: VerticalAlignment = 'bottom',
  horizontalPadding = 0
): void {
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error("Canvas 2D context not supported.");
  }

  // Calculate the aspect ratio of the image
  const aspectRatio = image.width / image.height;

  const paddedWidth = width - (horizontalPadding * 2);
  // Calculate the scaled dimensions to fit within the bounding box
  let scaledWidth = paddedWidth;
  let scaledHeight = paddedWidth / aspectRatio;

  if (scaledHeight > height) {
    scaledHeight = height;
    scaledWidth = height * aspectRatio;
  }

  // Calculate the position to center the image within the bounding box
  const offsetX = x + (paddedWidth - scaledWidth) / 2 + horizontalPadding;


  let offsetY: number;
  if(verticalAlign == 'bottom') {
    offsetY = canvas.height - scaledHeight;
  }
  else {
    // Align middle
    offsetY = y + (height - scaledHeight) / 2;
  }

  ctx.drawImage(image, offsetX, offsetY, scaledWidth, scaledHeight);
}

function renderTextOnCanvas(
  canvas: HTMLCanvasElement,
  x: number,
  y: number,
  width: number,
  fontSize: number,
  font: string,
  fontWeight: string, // Add fontWeight parameter
  color: string,
  angle: number,
  text: string,
  horizontalAlignment: 'left' | 'center' | 'right' = 'left'
): number {
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error("Canvas 2D context not supported.");
  }

  // Combine fontSize, fontWeight, and font family
  ctx.font = `${fontWeight} ${fontSize}px ${font}`;
  ctx.fillStyle = color;
  ctx.textBaseline = 'top';

  // Calculate the height of one line of text
  const lineHeight = fontSize;

  // Split the text into lines to fit within the specified width
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const { width: lineWidth } = ctx.measureText(testLine);

    if (lineWidth <= width) {
      currentLine = testLine;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  lines.push(currentLine);

  // Calculate the total height of the rendered text
  const totalHeight = lines.length * lineHeight;

  // Rotate the canvas counterclockwise
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate((angle * Math.PI) / 180);

  // Render each line of text with horizontal alignment
  lines.forEach((line, index) => {
    let textX: number;

    if (horizontalAlignment === 'center') {
      const { width: lineWidth } = ctx.measureText(line);
      textX = -lineWidth / 2;
    } else if (horizontalAlignment === 'right') {
      const { width: lineWidth } = ctx.measureText(line);
      textX = -lineWidth;
    } else {
      textX = 0;
    }

    const textY = index * lineHeight;
    ctx.fillText(line, textX, textY);
  });

  // Restore the canvas state
  ctx.restore();

  return totalHeight;
}

interface TextItem {
  text: string;
  fontSize: number;
  font: string;
  fontWeight: string;
  color: string;
}

type HorizontalAlignment = 'left' | 'center' | 'right';
type VerticalAlignment = 'top' | 'middle' | 'bottom';

function renderTextsOnCanvas(
  canvas: HTMLCanvasElement,
  x: number,
  y: number,
  width: number,
  height: number,
  angle: number,
  horizontalAlignment: HorizontalAlignment = 'left',
  verticalAlignment: VerticalAlignment = 'top',
  verticalPadding: number = 10,
  textItems: TextItem[]
): { textY: number, totalTextHeight: number } {
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error("Canvas 2D context not supported.");
  }

  // drawBoundingRect(ctx, x, y, width, height)

  // Rotate the canvas counterclockwise
  ctx.save();

  ctx.textBaseline = 'top';
  ctx.translate(x, y);
  ctx.rotate((angle * Math.PI) / 180);

  // Function to measure the total width of text lines
  function getTotalLineWidth(lines: string[], font: string, fontSize: number, fontWeight: string): number {
    if (!ctx) {
      throw new Error("Canvas 2D context not supported.");
    }

    let maxWidth = 0;
    ctx.font = `${fontWeight} ${fontSize}px ${font}`;
    for (const line of lines) {
      const { width } = ctx.measureText(line);
      maxWidth = Math.max(maxWidth, width);
    }
    return maxWidth;
  }

  // Function to wrap text into lines
  function wrapText(text: string, font: string, fontWeight: string, fontSize: number, maxWidth: number): string[] {
    if (!ctx) {
      throw new Error("Canvas 2D context not supported.");
    }

    ctx.font = `${fontWeight} ${fontSize}px ${font}`;
    const words = text.split(' ');
    const lines: string[] = [];
    let currentLine = '';

    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const { width } = ctx.measureText(testLine);

      if (width <= maxWidth) {
        currentLine = testLine;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    }
    
    lines.push(currentLine);

    return lines;
  }

  // Calculate the total height required for all text items
  const lineHeightRatio = 1.4;
  const  textHeight = textItems.map((textItem) => {
    const { fontSize, font, fontWeight } = textItem;
    const lines = wrapText(textItem.text, font, fontWeight, fontSize, width);
    const lineHeight = fontSize * lineHeightRatio;
    return lines.length * lineHeight;
  }).reduce((sum, height) => sum + height, 0);

  const paddingHeight = (textItems.length - 1) * verticalPadding
  const totalTextHeight = textHeight + paddingHeight;

  // Calculate vertical offset based on vertical alignment
  let offsetY: number;
  if (verticalAlignment === 'middle') {
    offsetY = (height - totalTextHeight) / 2;
  } else if (verticalAlignment === 'bottom') {
    offsetY = height - totalTextHeight;
  } else {
    offsetY = 0;
  }
  
  const startOffsetY = offsetY;

  textItems.forEach((textItem, index) => {
    const { text, fontSize, font, fontWeight, color } = textItem;
    const lines = wrapText(text, font, fontWeight, fontSize, width);
    const lineHeight = fontSize * lineHeightRatio;

    // Render each line of text
    lines.forEach((line) => {
      // Calculate horizontal offset based on horizontal alignment
      const lineWidth = getTotalLineWidth([line], font, fontSize, fontWeight);
      let offsetX: number;
      if (horizontalAlignment === 'center') {
        offsetX = (width - lineWidth) / 2;
      } else if (horizontalAlignment === 'right') {
        offsetX = width - lineWidth;
      } else {
        offsetX = 0;
      }

      const lineHeightCompensation = (lineHeight - fontSize) / 2;

      const textX = offsetX;
      const textY = offsetY + lineHeightCompensation;

      ctx.font = `${fontWeight} ${fontSize}px ${font}`;
      ctx.fillStyle = color;
      ctx.fillText(line, textX, textY);

      offsetY += fontSize + ((lineHeight - fontSize) / 2);
    });

    offsetY += (index < textItems.length - 1 ? verticalPadding : 0);
  });

  // Restore the canvas state
  ctx.restore();

  const textY = startOffsetY + y;
  // drawBoundingRect(ctx, x, textY, 400, totalTextHeight)

  return {
    textY,
    totalTextHeight
  };
}

interface PaddedTextItem  {
  text: string;
  color: string;
  backgroundColor: string;
}

function renderPaddedTexts(
  canvas: HTMLCanvasElement,
  x: number,
  y: number,
  width: number,
  height: number,
  horizontalAlign: 'left' | 'center' | 'right',
  verticalAlign: 'top' | 'middle' | 'bottom',
  fontSize: number,
  font: string,
  fontWeight: string,
  padding: number,
  textItems: PaddedTextItem[]
): void {
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error("Canvas 2D context not supported.");
  }

  ctx.textBaseline = 'top';

  // Calculate total width required for all text items
  ctx.font = `${fontWeight} ${fontSize}px ${font}`;

  let totalTextWidth = 0;
  textItems.forEach((textItem) => {
    const textWidth = ctx.measureText(textItem.text).width;
    totalTextWidth += textWidth + (padding * 2);
  });

  // Calculate horizontal offset based on horizontal alignment
  let textX: number;
  if (horizontalAlign === 'center') {
    textX = x + (width - totalTextWidth) / 2;
  } else if (horizontalAlign === 'right') {
    textX = x + width - totalTextWidth;
  } else {
    textX = x;
  }

  // Calculate vertical offset based on vertical alignment
  let textY: number;
  if (verticalAlign === 'middle') {
    textY = y + (height - fontSize) / 2 - (padding * 2);
  } else if (verticalAlign === 'bottom') {
    textY = y + height - fontSize - (padding * 2);
  } else {
    textY = y;
  }

  // Render each text item with background
  textItems.forEach((textItem) => {
    const { text, color, backgroundColor } = textItem;

    ctx.font = `${fontWeight} ${fontSize}px ${font}`;
    const textWidth = ctx.measureText(text).width;

    // Draw the background rectangle with padding
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(textX, textY, textWidth + 2 * padding, fontSize + 2 * padding);

    // Set text color and font
    ctx.fillStyle = color;


    // Draw the text
    ctx.fillText(text, textX + padding, textY + padding);

    // Update horizontal position for the next text item
    textX += textWidth + (padding * 2);
  });
}

const renderBackground = (canvas: HTMLCanvasElement, palette: ColorPalette) => {
  const ctx = canvas.getContext('2d');

  if(!ctx) {
    throw new Error("Couldn't get context");
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = palette.background;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
};

const renderVolte = (canvas: HTMLCanvasElement, palette: ColorPalette, x: number, y: number, width: number, height: number, horizontalAlign: HorizontalAlignment, hasToBeAligned = false, hasToBeSnapped = false) => {
  const isAligned = hasToBeAligned ? true : getRandomBool();
  const verticalAlign = isAligned ? 'bottom' : 'top';
  const topPadding = isAligned ? 0 : 64;
  const bottomPadding = (isAligned && !hasToBeSnapped) ? pickRandom([0, 30, 60]) : 0;
  const fontSize = (!isAligned || bottomPadding) ? 30 : 40;

  renderPaddedTexts(
    canvas,
    x,
    y + topPadding,
    width,
    height - bottomPadding,
    horizontalAlign,
    verticalAlign,
    fontSize,
    'Arial',
    'bold',
    24,
    [
      {
        text: 'Voľte',
        color: '#fff',
        backgroundColor: palette.primary,
      },
      {
        text: 'X',
        color: palette.primary,
        backgroundColor: '#fff',
      }
    ]
  );
}

const getSloganFontSize = (slogan: string) => {
  if(slogan.length < 10) {
    return 64;
  }
  else if(slogan.length < 30) {
    return 50;
  }
  else {
    return 40;
  }
};

const avatars = [
  '01_01.png',
  '02_01.png',
  '03_01.png',
  '03_02.png',
  '04_01.png',
  '05_01.png',
  '06_01.png',
  '07_01.png',
  '07_02.png',
  '08_01.png',
  '08_02.png',
  '09_01.png',
  '10_01.png',
  '10_02.png',
  '11_01.png',
  '12_01.png',
  '13_01.png',
  '13_02.png',
  '13_03.png',
  '14_01.png',
  '15_01.png',
  '15_02.png',
];

const generateBillboardForImage = (canvas: HTMLCanvasElement, image: HTMLImageElement, slogan: string, subheader: string, isCustomImage = false) => {
  const isDark = getRandomBool();
  const palette = generateRandomComplementaryColorPalette(isDark);

  // drawPalette(canvas, palette);
  renderBackground(canvas, palette);

  const photoRatio = pickRandom([1/3, 2/5, 1/2]);
  const photoWidth = Math.round(canvas.width * photoRatio);

  renderImageInCanvas(canvas, image, 0, 0, photoWidth, canvas.height, isCustomImage ? 'middle' : 'bottom', isCustomImage ? 30 : 0);

  const sloganIsLong = slogan.length > 25;
  const horizontalAlignment: HorizontalAlignment = pickRandom(['left', 'left', 'right']);
  const textTopPadding = sloganIsLong ? 32: 64;
  const sloganFont = 'Arial';
  const sloganSize = getSloganFontSize(slogan);
  const sloganWeight = 'bold';
  const sloganBottomPadding = 32;
  const shouldBeRotated = !sloganIsLong && getRandomBool(0.3);
  const angle = shouldBeRotated ? pickRandom([-4, -2]) : 0;
  const photoIsSmall = photoWidth <= Math.round(canvas.width / 3);
  const horizontalPadding = photoIsSmall ? (sloganIsLong ? 100 : 200) : 40;
  const verticalPadding = 0;

  const subheaderSize = 20;
  const subheaderFont = 'Arial';
  const subheaderWeight = 'normal';


  const x = photoWidth + horizontalPadding;
  const y = 90;
  const textWidth = canvas.width - x - horizontalPadding;
  const textHeight = canvas.height - y - textTopPadding;

  const { textY, totalTextHeight } = renderTextsOnCanvas(canvas, x, y, textWidth, textHeight, angle, horizontalAlignment, 'top', sloganBottomPadding, [
    {
      text: slogan,
      fontSize: sloganSize,
      font: sloganFont,
      fontWeight: sloganWeight,
      color: palette.primary,
    },
    {
      text: subheader,
      fontSize: subheaderSize,
      font: subheaderFont,
      fontWeight: subheaderWeight,
      color: isDark ? '#fff' : '#000',
    }
  ]);

  const volteY = textY + totalTextHeight + verticalPadding;
  const volteHeight = canvas.height - volteY - verticalPadding;
  const hasToBeAligned = true; //angle !== 0;

  renderVolte(canvas, palette, x, volteY, textWidth, volteHeight, horizontalAlignment, hasToBeAligned, sloganIsLong);
};

const generateBillboard = (canvas: HTMLCanvasElement, userImage: HTMLImageElement | null, slogan: string, subheader: string) => {
  if(userImage) {
    generateBillboardForImage(canvas, userImage, slogan, subheader, true);
  }
  else {
    const avatar = pickRandom(avatars);

    const randomAvatarImage = new Image();

    randomAvatarImage.onload = () => {
      generateBillboardForImage(canvas, randomAvatarImage, slogan, subheader);
    };

    randomAvatarImage.src = `/avatars/${avatar}`;
  }
};

export default generateBillboard;