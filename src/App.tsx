// @ts-nocheck TODO: Fix types
import React, { useState, useRef, useEffect } from 'react';
import generateSlogan from './generateSlogan';
import userPlaceholderSrc from './assets/user_placeholder.jpg';
import billboard1Src from './assets/billboard1.jpg';
import RefreshIcon from './RefreshIcon.tsx';
import './App.css';

const MAX_WIDTH = 800;
const MAX_HEIGHT = 600;

const isDev = import.meta.env.NODE_ENV !== 'production';

const billboard1 = {
  image: billboard1Src,
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


function resizeImageToFitContainer({ left, right, top, bottom }, imageWidth: number, imageHeight: number, containerWidth: number, containerHeight: number, widthPercentage: number, heightPercentage: number) {
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
  
  const horSpace = typeof left !== 'undefined' ? left * containerWidth : right * containerWidth;
  const vertSpace = typeof top !== 'undefined' ? top * containerHeight : bottom * containerHeight;

  const x = typeof left !== 'undefined' ? horSpace : containerWidth - (horSpace + newWidth);
  const y = typeof top !== 'undefined' ? vertSpace : containerHeight - (vertSpace + newHeight);

  return { x, y, width: newWidth, height: newHeight };
}

function renderTextOnCanvasWrapped(canvas, ctx, text, {
  left: leftPerc, right: rightPerc, top: topPerc, bottom: bottomPerc,
  horizontalPadding: horPaddingPerc, verticalPadding: vertPaddingPerc,
  horizontalAlign = 'left',
  verticalAlign = 'bottom',
  fontSize = 16,
  font = 'Arial',
}, containerWidth, containerHeight) {
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
  function wrapText(text) {
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
  let x, y;

  if (horizontalAlign === 'left') {
    x = left + horizontalPadding;
  } else if (horizontalAlign === 'right') {
    x = canvas.width - right - maxTextWidth - horizontalPadding;
  } else {
    // Default to 'center' alignment if not 'left' or 'right'
    x = left + (containerWidth - maxTextWidth) / 2;
  }

  if (verticalAlign === 'top') {
    y = top + (typeof top === 'undefined' ? verticalPadding : 0);
  } else if (verticalAlign === 'bottom') {
    y = canvas.height - bottom - totalTextHeight - (typeof bottom === 'undefined' ? verticalPadding : 0);
  } else {
    // Default to 'middle' alignment if not 'top' or 'bottom'
    y = top + (containerHeight - totalTextHeight) / 2;
  }

  // Clear the canvas and render the wrapped text
  // ctx.clearRect(0, 0, canvas.width, canvas.height);
  wrappedText.forEach((line) => {
    ctx.fillText(line, x, y);
    y += fontSize;
  });
}

function App() {
  const [userImage, setUserImage] = useState(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const devImageRef = useRef(false);

  const handleUploadClick = () => {
    if(inputRef.current) {
      inputRef.current.click();
    }
  }

  const handleGenerateBillboard = () => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    if (userImage && canvas && context) {
      const billboard = billboard1;
      const slogan = generateSlogan();
      
      // Load the billboard template image
      const templateImage = new Image();
      templateImage.src = billboard.image;

      templateImage.onload = () => {
        const originalWidth = templateImage.width;
        const originalHeight = templateImage.height;

        // Calculate new dimensions while preserving aspect ratio
        let backgroundWidth = originalWidth;
        let backgroundHeight = originalHeight;

        if (originalWidth > MAX_WIDTH || originalHeight > MAX_HEIGHT) {
          const widthRatio = MAX_WIDTH / originalWidth;
          const heightRatio = MAX_HEIGHT / originalHeight;
          const minRatio = Math.min(widthRatio, heightRatio);

          backgroundWidth = originalWidth * minRatio;
          backgroundHeight = originalHeight * minRatio;
        }

        canvas.width = backgroundWidth;
        canvas.height = backgroundHeight;

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
//           const { x: sloganX, y: sloganY, width: sloganWidth, height: sloganHeight } = getSloganDimensions(billboard.slogan, backgroundWidth, backgroundHeight, billboard.slogan.horizontalPadding, billboard.slogan.verticalPadding, billboard.slogan.fontSize);
// console.log('sloganX: ', sloganX);
// console.log('sloganY: ', sloganY);
// console.log('sloganWidth: ', sloganWidth);
// console.log('sloganHeight: ', sloganHeight);
          // context.fillText(slogan, sloganX, sloganY, maxWidth);
          // renderTextOnCanvas(
          //   context,
          //   slogan,
          //   { x: sloganX, y: sloganY, width: sloganWidth, height: sloganHeight },
          //   billboard.slogan.fontSize,
          //   billboard.slogan.horizontalAlign,
          //   billboard.slogan.verticalAlign,
          // );

          // renderTextOnCanvas2(canvas,context, slogan, billboard.slogan, backgroundWidth, backgroundHeight)
          renderTextOnCanvasWrapped(canvas,context, slogan, billboard.slogan, backgroundWidth, backgroundHeight)

          const notice = "Vygenerujte si aj vy svoj náhodný billboard na www.prazdnehesla.sk a rozmýšlajte nad tým čo vám politici sľubujú.";
          renderTextOnCanvasWrapped(canvas,context, notice, billboard.notice, backgroundWidth, backgroundHeight)
        };
      };
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setUserImage(imageUrl);
  };

  // const handleFacebookShare = () => {
  //   if (userImage) {
  //     const canvas = canvasRef.current;
  //
  //     // Convert the canvas to a data URL (base64)
  //     const imageDataURL = canvas.toDataURL('image/png');
  //
  //     // Use the Facebook SDK to share the image
  //     FB.ui({
  //       method: 'share',
  //       href: 'https://your-website-url.com', // Replace with your website URL
  //       picture: imageDataURL,
  //       caption: 'Check out my political billboard!',
  //     }, function(response){});
  //   }
  // };

  useEffect(() => {
    if(!devImageRef.current && isDev) {
      devImageRef.current = true;
      const image = new Image();

      image.src = userPlaceholderSrc;

      image.onload = function () {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Set the canvas dimensions to match the image dimensions
        canvas.width = image.width;
        canvas.height = image.height;

        // Draw the loaded image onto the canvas
        ctx.drawImage(image, 0, 0);

        // Convert the canvas content to a Blob
        canvas.toBlob(function (blob) {
          // Create an object URL for the Blob
          const imageUrl = URL.createObjectURL(blob);
          setUserImage(imageUrl);
        }, 'image/jpeg'); // Specify the desired image format (e.g., 'image/jpeg' or 'image/png')
      };
    }
  }, []);

  useEffect(() => {
    if(userImage) {
      handleGenerateBillboard();
    }
  }, [handleGenerateBillboard, userImage]);

  return (
    <div className="App">
      <h1>Vygenerujte si prázdne heslá</h1>

      <div className="buttons">
        <div className="upload-btn-wrapper">
          <button onClick={handleUploadClick}>{userImage ? 'Nahraj inú fotku' : 'Nahraj si svoju fotku'}</button>

          {/*<span>Žiadna fotka nevybraná</span>*/}
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            title="Nahraj svoju fotku"
            onChange={handleImageUpload}
          />
        </div>
        {userImage &&
          <button className="primary" onClick={handleGenerateBillboard}>
          <span className="icon refresh-icon">
            <RefreshIcon />
          </span>
            Vygeneruj nový billboard
          </button>
        }

      </div>

      {userImage && (
        <div>
          <canvas ref={canvasRef} width={400} height={300}></canvas>
        </div>
      )}

      {userImage &&
        <>
          {/*<button onClick={handleFacebookShare}>Share on Facebook</button>*/}

          <p>
            Vidíte aké ľahké je náhodne vygenerovať prázdny politický slogan? Niektoré dokonca dávajú väčší zmysel ako výroky skutočných politikov.<br />
            Rozmýšlajte nad tým čo vám politici sľubujú predtým ako im hodíte hlas.
          </p>

          <p>
            <a href="#">
              Zásady ochrany osobných údajov
            </a>
          </p>
        </>
      }
    </div>
  );
}

export default App;
