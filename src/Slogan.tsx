import { Meta } from 'react-head';
import { Link, useParams, useNavigate } from 'react-router-dom';
import './Slogan.css';
import { useState } from 'react';

const VITE_IMAGE_CDN_FOLDER = import.meta.env.VITE_IMAGE_CDN_FOLDER || 'prod';
const BASE_URL = import.meta.env.VITE_IMAGE_CDN_URL;

function Slogan() {
  const navigate = useNavigate();
  const { sloganId } = useParams();
  const [notFound, setNotFound] = useState(false);

  if(!sloganId) {
    navigate("/");
    return null;
  }

  const imageUrl = `${BASE_URL}/${VITE_IMAGE_CDN_FOLDER}/${sloganId}.jpg`;

  return (
    <div id="root">
      <Meta property="og:image" content={imageUrl} />

      <h1>Prázdne heslá</h1>

      {notFound ?
        <img id="slogan-image" alt="Slogan sa nenašiel" src="/not_found.jpg" />
        :
        <img id="slogan-image" alt="Náhodne vygenerovaný politický slogan" src={imageUrl} onError={() => setNotFound(true)} />
      }

      <p>
        <Link className="button primary" to="/">
          Vygenerujte si vlastný slogan
        </Link>
      </p>
    </div>
  )
}

export default Slogan;
