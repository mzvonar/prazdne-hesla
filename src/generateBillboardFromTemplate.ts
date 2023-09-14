// @ts-nocheck

interface Positioning {
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
}

interface TextConfig {
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
  fontSize: number;
  font?: string;
  color?: string;
  horizontalPadding: number;
  verticalPadding: number;
  horizontalAlign: 'left' | 'right';
  verticalAlign: 'top' | 'bottom';
}

interface Billboard {
  image: string;
  photo: {
    left?: number;
    right?: number;
    top?: number;
    bottom?: number;
    width: number;
    height: number;
  },
  slogan: TextConfig;
  notice: TextConfig;
}

const billboard1: Billboard = {
  image: 'billboards/billboard1.jpg',
  photo: {
    left: 0.05,
    bottom: 0,
    width: 0.3,
    height: 0.8,
  },
  slogan: {
    left: 0.4,
    bottom: 0.2,
    fontSize: 40,
    horizontalPadding: 0.05,
    verticalPadding: 0.05,
    horizontalAlign: 'left',
    verticalAlign: 'bottom',
  },
  notice: {
    left: 0.4,
    bottom: 0.01,
    fontSize: 15,
    horizontalPadding: 0.05,
    verticalPadding: 0.05,
    horizontalAlign: 'left',
    verticalAlign: 'bottom',
  }
};

const billboard2: Billboard = {
  image: 'billboards/billboard2.jpg',
  photo: {
    left: 0.12,
    bottom: 0,
    width: 0.3,
    height: 0.8,
  },
  slogan: {
    left: 0.4,
    top: 0.3,
    fontSize: 50,
    color: '#b7151c',
    horizontalPadding: 0.05,
    verticalPadding: 0.05,
    horizontalAlign: 'left',
    verticalAlign: 'top',
  },
  notice: {
    left: 0.4,
    bottom: 0.005,
    fontSize: 15,
    color: '#000',
    horizontalPadding: 0.05,
    verticalPadding: 0.05,
    horizontalAlign: 'left',
    verticalAlign: 'bottom',
  }
};

const billboard3: Billboard = {
  image: 'billboards/billboard3.jpg',
  photo: {
    left: 0.05,
    bottom: 0,
    width: 0.3,
    height: 0.8,
  },
  slogan: {
    left: 0.35,
    top: 0.3,
    fontSize: 50,
    color: '#000',
    horizontalPadding: 0.05,
    verticalPadding: 0.05,
    horizontalAlign: 'left',
    verticalAlign: 'top',
  },
  notice: {
    left: 0.35,
    bottom: 0.01,
    fontSize: 15,
    color: '#000',
    horizontalPadding: 0.05,
    verticalPadding: 0.05,
    horizontalAlign: 'left',
    verticalAlign: 'bottom',
  }
};

const billboards: Billboard[] = [
  billboard1,
  billboard2,
  billboard3,
]

function getRandomBillboard() {
  const randomIndex = Math.floor(Math.random() * billboards.length);
  return billboards[randomIndex];
}

function resizeImageToFitContainer({ left, right, top, bottom }: Positioning, imageWidth: number, imageHeight: number, containerWidth: number, containerHeight: number, widthPercentage: number, heightPercentage: number) {
  // Calculate the available width and height within the container
  const availableWidth = containerWidth - (left || 0) - (right || 0);
  const availableHeight = containerHeight - (top || 0) - (bottom || 0);

  // Calculate the maximum width and height based on percentages
  const maxWidth = availableWidth * widthPercentage;
  const maxHeight = availableHeight * heightPercentage;

  // Calculate the aspect ratio of the image
  const imageAspectRatio = imageWidth / imageHeight;

  // Calculate the new dimensions while preserving the aspect ratio
  let newWidth = maxWidth;
  let newHeight = maxHeight;

  if (maxWidth / maxHeight > imageAspectRatio) {
    newWidth = maxHeight * imageAspectRatio;
  } else {
    newHeight = maxWidth / imageAspectRatio;
  }

  // Ensure the image fits within the available space
  if (newWidth > availableWidth) {
    newWidth = availableWidth;
    newHeight = availableWidth / imageAspectRatio;
  }
  if (newHeight > availableHeight) {
    newHeight = availableHeight;
    newWidth = availableHeight * imageAspectRatio;
  }

  const horSpace = typeof left !== 'undefined' ? left * containerWidth : (right || 0) * containerWidth;
  const vertSpace = typeof top !== 'undefined' ? top * containerHeight : (bottom || 0) * containerHeight;

  const x = typeof left !== 'undefined' ? horSpace : containerWidth - (horSpace + newWidth);
  const y = typeof top !== 'undefined' ? vertSpace : containerHeight - (vertSpace + newHeight);

  return { x, y, width: newWidth, height: newHeight };
}

function renderTextOnCanvasWrapped(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, text: string, {
  left: leftPerc, right: rightPerc, top: topPerc, bottom: bottomPerc,
  horizontalPadding: horPaddingPerc, verticalPadding: vertPaddingPerc,
  horizontalAlign = 'left',
  verticalAlign = 'bottom',
  fontSize = 16,
  color = '#fff',
  font = 'Arial',
}: TextConfig, containerWidth: number, containerHeight: number) {
  // const ctx = canvas.getContext('2d');
  const left = leftPerc && leftPerc * containerWidth;
  const right = rightPerc && rightPerc * containerWidth;
  const top = topPerc && topPerc * containerHeight;
  const bottom = bottomPerc && bottomPerc * containerHeight;
  const horizontalPadding = (horPaddingPerc && horPaddingPerc * containerWidth) || 0;
  const verticalPadding = (vertPaddingPerc && vertPaddingPerc * containerWidth) || 0;

  // Calculate the maximum text width based on container dimensions
  const maxTextWidth = containerWidth - (left || 0) - (right || 0) - 2 * horizontalPadding;

  // Set font properties
  ctx.font = `${fontSize}px ${font}`;
  ctx.textAlign = horizontalAlign;
  ctx.textBaseline = verticalAlign;

  // Split the text into lines that fit within the maximum width
  function wrapText(text: string) {
    const words = text.split(' ');
    const lines = [];
    let line = '';

    for (const word of words) {
      const testLine = line + (line ? ' ' : '') + word;
      const testWidth = ctx.measureText(testLine).width;

      if (testWidth <= maxTextWidth) {
        line = testLine;
      } else {
        lines.push(line);
        line = word;
      }
    }

    if (line) {
      lines.push(line);
    }

    return lines;
  }

  const wrappedText = wrapText(text);

  // Calculate the total text height
  const totalTextHeight = wrappedText.length * fontSize;

  // // Calculate the y position for vertical alignment
  // let y;
  //
  // if (top !== undefined) {
  //   y = top + verticalPadding + fontSize;
  // } else if (bottom !== undefined) {
  //   y = canvas.height - bottom - verticalPadding - totalTextHeight + fontSize;
  // } else {
  //   // Default to middle alignment if neither top nor bottom is provided
  //   y = canvas.height / 2 - totalTextHeight / 2 + fontSize;
  // }
  // Calculate x and y positions for horizontal and vertical alignment
  let x: number;
  let y: number;

  if (horizontalAlign === 'left') {
    x = (left || 0) + horizontalPadding;
  } else if (horizontalAlign === 'right') {
    x = canvas.width - (right || 0) - maxTextWidth - horizontalPadding;
  } else {
    // Default to 'center' alignment if not 'left' or 'right'
    x = (left || 0) + (containerWidth - maxTextWidth) / 2;
  }

  if (verticalAlign === 'top') {
    y = (top || 0) + (typeof top === 'undefined' ? verticalPadding : 0);
  } else if (verticalAlign === 'bottom') {
    y = canvas.height - (bottom || 0) - totalTextHeight - (typeof bottom === 'undefined' ? verticalPadding : 0);
  } else {
    // Default to 'middle' alignment if not 'top' or 'bottom'
    y = (top || 0) + (containerHeight - totalTextHeight) / 2;
  }

  ctx.fillStyle = color;
  // Clear the canvas and render the wrapped text
  // ctx.clearRect(0, 0, canvas.width, canvas.height);
  wrappedText.forEach((line) => {
    ctx.fillText(line, x, y);
    y += fontSize;
  });
}

const generateBillboardFromTemplate = (canvas: HTMLCanvasElement, userImage: HTMLImageElement, slogan: string) => {
  const billboard = getRandomBillboard();

  // Load the billboard template image
  const templateImage = new Image();
  templateImage.src = billboard.image;

  templateImage.onload = () => {
    const originalWidth = templateImage.width;
    const originalHeight = templateImage.height;

    // Calculate new dimensions while preserving aspect ratio
    let backgroundWidth = originalWidth;
    let backgroundHeight = originalHeight;

    if (originalWidth > backgroundWidth || originalHeight > backgroundHeight) {
      const widthRatio = backgroundWidth / originalWidth;
      const heightRatio = backgroundHeight / originalHeight;
      const minRatio = Math.min(widthRatio, heightRatio);

      backgroundWidth = originalWidth * minRatio;
      backgroundHeight = originalHeight * minRatio;
    }

    canvas.width = backgroundWidth;
    canvas.height = backgroundHeight;

    const context = canvas.getContext('2d');
    // Draw the template image on the canvas
    context.drawImage(templateImage, 0, 0, backgroundWidth, backgroundHeight);

    // Load the user's uploaded image
    const userImg = new Image();
    userImg.src = userImage;

    userImg.onload = () => {
      // Calculate the position to overlay the user's image (adjust as needed)
      const { x, y, width, height } = resizeImageToFitContainer(billboard.photo, userImg.width, userImg.height, backgroundWidth, backgroundHeight, billboard.photo.width, billboard.photo.height);

      // Draw the user's image on the canvas
      context.drawImage(userImg, x, y, width, height);

      // Add the slogan text (customize font, color, etc.)
      context.font = `${billboard.slogan.fontSize}px Arial`;
      context.fillStyle = 'white';

      // renderTextOnCanvas2(canvas,context, slogan, billboard.slogan, backgroundWidth, backgroundHeight)
      renderTextOnCanvasWrapped(canvas,context, slogan, billboard.slogan, backgroundWidth, backgroundHeight)

      const notice = "Vygenerujte si aj vy svoj náhodný billboard na www.prazdnehesla.sk a rozmýšlajte nad tým čo vám politici sľubujú.";
      renderTextOnCanvasWrapped(canvas,context, notice, billboard.notice, backgroundWidth, backgroundHeight)
    };
  };
};

export default generateBillboardFromTemplate;