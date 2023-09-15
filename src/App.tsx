import { useState, useRef, useEffect, ChangeEvent, MouseEvent } from 'react';
import axios from 'axios';
// import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loadFonts } from './fonts.ts';
import generateSlogan from './generateSlogan';
import RefreshIcon from './RefreshIcon.jsx';
import TrashIcon from './TrashIcon.jsx';
import FacebookIcon from './FacebookIcon.tsx';
import { avatars } from './generateBillboard';
import './App.css';
import Billboard from './Billboard.jsx';

const MAX_WIDTH = 1000;
const MAX_HEIGHT = 500;

const ALLOW_PHOTO_UPLOAD = import.meta.env.VITE_ALLOW_PHOTO_UPLOAD === 'true';
const START_WITH_PLACEHOLDER = import.meta.env.VITE_START_WITH_PLACEHOLDER === 'true';
const RECAPTCHA_SITE_KEY = import.meta.env.VITE_GOOGLE_RECAPTCHA_SITE_KEY;

function getImageAsBase64(canvas: HTMLCanvasElement) {
  // Convert the canvas to a data URL (base64)
  return canvas.toDataURL('image/jpeg',  1.0);
}

function preloadImages(imageUrls: string[]) {
  setTimeout(() => {
    imageUrls.map((url) => {
      return new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.onerror = () => reject(new Error(`Failed to load image: ${url}`));
        image.src = `avatars/${url}`;
      });
    })
  }, 3000);
}

async function uploadImage(token: string, imageBase64: string) {
  const response = await axios.post('/.netlify/functions/upload-image', {
    recaptchaToken: token,
    imageBase64,
  });

  return response.data;
}

function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [userImage, setUserImage] = useState<HTMLImageElement | null>(null);
  const [slogan, setSlogan] = useState<string>(generateSlogan);
  const [imageIsSaving, setImageIsSaving] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const uploadButtonRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const hasImage = userImage || START_WITH_PLACEHOLDER;

  const handleUploadClick = () => {
    if(inputRef.current) {
      inputRef.current.click();
    }
  }

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const file = event.target.files?.[0];

    if(!file) {
      throw new Error('File is empty');
    }

    const image = new Image();

    image.onload = () => {
      setUserImage(image);
    };

    const imageUrl = URL.createObjectURL(file);
    image.src = imageUrl;

    if(uploadButtonRef.current) {
      uploadButtonRef.current.blur();
    }
  };

  const handleRemoveUserImage = (e: MouseEvent) => {
    e.preventDefault();

    setUserImage(null);
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleGenerateBillboard = () => {
    const slogan = generateSlogan();

    setSlogan(slogan);
  };


  const handleFacebookShare = async (e: MouseEvent) => {
    e.preventDefault();

    const canvas = canvasRef.current;

    if (hasImage && canvas) {
      grecaptcha.ready(async () => {
        try {
          setImageIsSaving(true);

          const token = await grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: 'submit' });
          const imageDataURL = getImageAsBase64(canvas);

          const  { imageName } = await uploadImage(token, imageDataURL);

          const urlToShare = new URL(`/slogan/${imageName}`, window.location.origin);
          const encodedUrlToShare = encodeURIComponent(urlToShare.toString());

          // Create the Facebook share URL
          const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrlToShare}`;

          // Open a new window with the Facebook share dialog
          window.open(facebookShareUrl, 'Zdieľaj billboard na Facebooku', 'width=600,height=400');
          setImageIsSaving(false);
        }
        catch(e) {
          console.error(e);
          toast.error("Ľutujeme, ale nastala chyba");
          setImageIsSaving(false);
        }
      });
    }
  };

  const handleDownloadImage = (e: MouseEvent) => {
    e.preventDefault();

    const canvas = canvasRef.current;

    if(canvas) {
      const imageDataURL = getImageAsBase64(canvas);

      const downloadLink = document.createElement('a');
      downloadLink.href = imageDataURL;
      const slogan = canvas.dataset.slogan || 'slogan';
      const fileName = slogan.split(' ').join('_');

      downloadLink.download = `${fileName}.jpg`;

      downloadLink.click();
    }
  };

  useEffect(() => {
    preloadImages(avatars);

    loadFonts().then(() => setFontsLoaded(true));
  }, []);

  return (
    <div className="App">
      <ToastContainer />

      <h1>
        {!hasImage ? 'Vygenerujte si prázdne heslá' : 'Prázdne heslá'}
      </h1>

      {!hasImage &&
        <div className="start-text">
          Začnite tým, že nahráte svoju fotku:
        </div>
      }

      {hasImage && slogan && fontsLoaded &&
        <Billboard
          canvasRef={canvasRef}
          slogan={slogan}
          subheader="Generujem billboardy na prazdnehesla.sk"
          width={MAX_WIDTH}
          height={MAX_HEIGHT}
          userImage={userImage}
        />
      }


      <div className="bottom-buttons">
        {hasImage &&
          <button className="secondary" onClick={handleGenerateBillboard}>
              <span className="icon refresh-icon">
                <RefreshIcon />
              </span>
            Vygeneruj nový billboard
          </button>
        }

        {ALLOW_PHOTO_UPLOAD &&
          <div className="upload-btn-wrapper">
            <button id="upload-button" ref={uploadButtonRef} className={!hasImage ? 'primary' : ''} onClick={handleUploadClick}>
              {userImage ? 'Nahraj inú fotku' : 'Nahraj svoju fotku'}
            </button>

            {/*<span>Žiadna fotka nevybraná</span>*/}
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              title="Nahraj svoju fotku"
              onChange={handleImageUpload}
            />

            {userImage &&
              <button className="outline-danger delete-user-image-button" onClick={handleRemoveUserImage}>
                <span className="icon">
                  <TrashIcon />
                </span>
              </button>
            }
          </div>
        }

        {hasImage &&
          <button id="save-image-button" onClick={handleDownloadImage}>
            Uložiť ako obrázok
          </button>
        }

        {hasImage &&
          <button id="share-fb-button" className="primary" onClick={handleFacebookShare}>
            <span className="icon">
              <FacebookIcon />
            </span>
            {imageIsSaving ? 'Pracujem...' : 'Zdieľať billboard na Facebooku'}
          </button>
        }
      </div>

      {hasImage &&
        <>
          <p>
            <strong>Voľte s rozumom!</strong> Je celkom ľahké náhodne vygenerovať prázdny politický slogan. Niektoré dokonca dávajú väčší zmysel ako výroky skutočných politikov.<br />
            <strong>Rozmýšlajte nad tým čo vám politici sľubujú predtým ako im hodíte hlas.</strong>
          </p>

          {/*<p>*/}
          {/*  <Link to="/zasady-ochrany-osobnych-udajov">*/}
          {/*    Zásady ochrany osobných údajov*/}
          {/*  </Link>*/}
          {/*</p>*/}
        </>
      }
    </div>
  );
}

export default App;
