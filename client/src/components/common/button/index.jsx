import React from 'react';
import './index.scss';

const Button = ({ name, type, handleClick }) => (
  <button className={type ? `button button-${type}` : 'button'} type="button" onClick={handleClick}>
    {name}
  </button>
);

export default Button;
