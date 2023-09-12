import Helmet from 'react-helmet';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { urlParameterToImageName } from './utils.ts';

const BASE_URL= import.meta.env.VITE_IMAGE_CDN_URL;

function Slogan() {
  const navigate = useNavigate();
  const { sloganId } = useParams();

  if(!sloganId) {
    navigate("/");
    return null;
  }

  const imageName = urlParameterToImageName(sloganId);
  const imageUrl = `${BASE_URL}${imageName}`;

  return (
    <div>
      <Helmet>
        <meta property="og:image" content={imageUrl} />
      </Helmet>

      <h1>Prázdne heslá</h1>

      <img alt="Náhodne vygenerovaný politický slogan" src={imageUrl} />

      <p>
        <Link className="button primary" to="/">
          Vygenerujte si vlastný slogan
        </Link>
      </p>
    </div>
  )
}

export default Slogan;
