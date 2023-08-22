import React from 'react';
import './index.scss';

const Button = ({ name, type, handleClick, icon, className, disabled }) => (
  <button
    className={`${type ? `button button-${type}` : 'button'} ${className}`}
    type="button"
    onClick={handleClick}
    disabled={disabled}
  >
    {icon && <img src={icon} alt={name} />}
    {name}
  </button>
);

export default Button;
