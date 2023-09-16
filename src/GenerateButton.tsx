import React, { ButtonHTMLAttributes } from 'react';
import RefreshIcon from './RefreshIcon.tsx';
import { Link } from 'react-router-dom';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  link?: boolean;
}

const GenerateButton: React.FC<Props> = ({ link, ...props }) => {
  const Component = link ? Link : 'button';

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <Component className="button secondary" {...props}>
      <span className="icon refresh-icon">
        <RefreshIcon/>
      </span>
      Vygeneruj nový billboard
    </Component>
  );
};

export default GenerateButton;