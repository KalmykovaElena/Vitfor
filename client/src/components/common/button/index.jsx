import React from 'react';
import './index.scss';

const Button = ({ name, type, handleClick, icon, className }) => (
  <button className={`${type ? `button button-${type}` : 'button'} ${className}`} type="button" onClick={handleClick}>
    {icon && <img src={icon} alt={name} />}
    {name}
  </button>
);

export default Button;
