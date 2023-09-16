import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const ALLOW_PHOTO_UPLOAD = import.meta.env.VITE_ALLOW_PHOTO_UPLOAD === 'true';

function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <h1>
        <Link to="/" style={{ fontSize: '0.6em', marginRight: '20px' }}>&lt; späť</Link>
        Prázdne heslá
      </h1>

      <h2>Zásady ochrany osobných údajov</h2>

      <p>
        Tieto zásady ochrany osobných údajov upravujú
         spôsob, akým táto webová aplikácia zbiera, používa, 
         uchováva a zverejňuje informácie získané od používateľov.
         </p>

  <h3>Zbieranie a využitie informácií</h3>

  <p>
    Táto stránka nezbiera žiadne osobné údaje od používateľov. 
    Aplikácia generuje náhodné obrázky. 
    {ALLOW_PHOTO_UPLOAD &&
      <span>
        &nbsp;Služba poskytuje možnosť používateľom 
        zahrnúť vlastný obrázok. 
        Tento obrázok nie je uložený aplikáciou.
      </span>
    }
  </p>

  <h3>Zdieľanie na Facebooku</h3>

  <p>
    Ak sa používateľ rozhodne zdieľať finálny obrázok na Facebooku, tento obrázok 
    bude uložený v Cloudinary, čo je obrázková CDN tretej strany. 
    Neuchovávame alebo nepoužívame tento obrázok na žiadny iný účel.
  </p>

  <h3>Služby tretích strán</h3>

  <p>
    Aplikácia využíva služby Google reCAPTCHA na zabezpečenie a Google Fonts pre zobrazenie písma. 
    Tieto služby môžu zbierať údaje podľa popisu v ich príslušných zásadách ochrany súkromia.
  </p>
    </div>
  );
}

export default PrivacyPolicy;
