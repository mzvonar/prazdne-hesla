import React, { ButtonHTMLAttributes } from 'react';
import FacebookIcon from './FacebookIcon.tsx';
import { canShare } from './sharing.ts';

const staticShareData = {
  title: "Prázdne heslá",
  text: "Náhodný generátor prázdnych politických hesiel",
  url: window.location.href,
};

interface Props extends ButtonHTMLAttributes<HTMLButtonElement>  {
  isSaving: boolean;
  link?: boolean;
  shareData?: ShareData;
}

const ShareButton: React.FC<Props> = React.forwardRef<HTMLButtonElement, Props>(({ className, isSaving, link, shareData, ...props }, ref) => {
  const _canShare = canShare(shareData || staticShareData);

  const title = _canShare ? 'Zdieľať billboard' : 'Zdieľať billboard na Facebooku';

  const Component = link ? 'a' : 'button';

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <Component ref={ref} id="share-fb-button" className={`button primary${className || ''}`} {...props}>
      {!_canShare &&
        <span className="icon">
          <FacebookIcon/>
        </span>
      }
      {isSaving ? 'Pracujem...' : title}
    </Component>
  );
});

export default ShareButton;