import { useState, useEffect, useRef, MouseEvent } from 'react';
import { Meta } from 'react-head';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import './Slogan.css';
import ShareButton from './ShareButton.tsx';
import GenerateButton from './GenerateButton.tsx';
import { canShare } from './sharing.ts';

const VITE_IMAGE_CDN_FOLDER = import.meta.env.VITE_IMAGE_CDN_FOLDER || 'prod';
const BASE_URL = import.meta.env.VITE_IMAGE_CDN_URL;

function Slogan() {
  const location = useLocation();
  const navigate = useNavigate();
  const { sloganId } = useParams();
  const [notFound, setNotFound] = useState(false);
  const shareRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    if(sloganId && shareRef.current && location.state?.share) {
      navigate(location.pathname, { replace: true });
      shareRef.current.click();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if(!sloganId) {
    navigate("/");
    return null;
  }

  const imageUrl = `${BASE_URL}/${VITE_IMAGE_CDN_FOLDER}/${sloganId}.jpg`;
  const urlToShare = new URL(`/slogan/${sloganId}`, window.location.origin);
  const encodedUrlToShare = encodeURIComponent(urlToShare.toString());
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrlToShare}`;
  const shareData = {
    title: "Prázdne heslá",
    text: "Náhodný generátor prázdnych politických hesiel",
    url: encodedUrlToShare,
  };

  const handleShareClick = (e: MouseEvent) => {
    if(canShare(shareData)) {
      e.preventDefault();
      navigator.share(shareData);
    }
  };

  return (
    <div id="root">
      <Meta property="og:image" content={imageUrl} />

      <h1>Prázdne heslá</h1>

      {notFound ?
        <img id="slogan-image" alt="Slogan sa nenašiel" src="/not_found.jpg" />
        :
        <img id="slogan-image" alt="Náhodne vygenerovaný politický slogan" src={imageUrl} onError={() => setNotFound(true)} />
      }

      <div className="bottom-buttons">
        <GenerateButton
          link
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          to="/"
        />

        <ShareButton
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          ref={shareRef}
          link
          href={facebookShareUrl}
          shareData={shareData}
          onClick={handleShareClick}
        />
      </div>
    </div>
  )
}

export default Slogan;
