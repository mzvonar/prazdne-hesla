import { Meta } from 'react-head';
import { Link, useParams, useNavigate } from 'react-router-dom';
import './Slogan.css';

const VITE_IMAGE_CDN_FOLDER = import.meta.env.VITE_IMAGE_CDN_FOLDER || 'prod';
const BASE_URL = import.meta.env.VITE_IMAGE_CDN_URL;

function Slogan() {
  const navigate = useNavigate();
  const { sloganId } = useParams();

  if(!sloganId) {
    navigate("/");
    return null;
  }

  const imageUrl = `${BASE_URL}/${VITE_IMAGE_CDN_FOLDER}/${sloganId}.jpg`;

  return (
    <div id="root">
      <Meta property="og:image" content={imageUrl} />

      <h1>Prázdne heslá</h1>

      <img id="slogan-image" alt="Náhodne vygenerovaný politický slogan" src={imageUrl} />

      <p>
        <Link className="button primary" to="/">
          Vygenerujte si vlastný slogan
        </Link>
      </p>
    </div>
  )
}

export default Slogan;
