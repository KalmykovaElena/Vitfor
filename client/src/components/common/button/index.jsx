import React from 'react';
import './index.scss';

const Button = ({ name }) => (
  <button className="button" type="button">
    {name}
  </button>
);

export default Button;
