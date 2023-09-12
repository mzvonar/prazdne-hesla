import { useEffect, useRef } from 'react';
import Helmet from 'react-helmet';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { FacebookShareButton } from 'react-share';
import { urlParameterToImageName } from './utils.ts';

const BASE_URL= import.meta.env.VITE_IMAGE_CDN_URL;

function Slogan() {
  const location = useLocation();
  console.log('location: ', location);
  const navigate = useNavigate();
  const { sloganId } = useParams();
  const shareButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if(sloganId && location.search.includes('share')) {
      // location.search = '';
      console.log('shareButtonRef.current: ', shareButtonRef.current);
      if(shareButtonRef.current) {
        shareButtonRef.current.click();
      }
    }
  }, [location, sloganId]);

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



      <FacebookShareButton ref={shareButtonRef} url={window.location.href}>
        Zdielať na Facebooku
      </FacebookShareButton>

      {/*<div className="fb-share-button"*/}
      {/*     data-href={location.pathname}*/}
      {/*     data-layout="button_count">*/}
      {/*</div>*/}
      {/*<div id="fb-root"></div>*/}
      {/*<script dangerouslySetInnerHTML={{ __html: '(function(d, s, id) {\n' +*/}
      {/*    'console.log("fb INIT")\n' +*/}
      {/*  '          var js, fjs = d.getElementsByTagName(s)[0];\n' +*/}
      {/*  '          if (d.getElementById(id)) return;\n' +*/}
      {/*  '          js = d.createElement(s); js.id = id;\n' +*/}
      {/*  '          js.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.0";\n' +*/}
      {/*  '          fjs.parentNode.insertBefore(js, fjs);\n' +*/}
      {/*  '        }(document, \'script\', \'facebook-jssdk\'))'}}>*/}
      {/*</script>*/}
    </div>
  )
}

export default Slogan;
