import React from 'react';
import './index.scss';

const Logo = ({ name, img, color, text, subtext, textLocation, handler }) => (
  <div className={textLocation ? `logo logo-${name} logo-${textLocation}` : `logo logo-${name}`}>
    <div className="logo-text">
      <h3 className="logo-text__name">{text}</h3>
      {subtext && <div className="logo-text__subname">{subtext}</div>}
    </div>
    <div className="logo-img" onClick={handler}>
      {!color ? <img src={img} alt="logo" /> : <span style={{ color }}>{text?.slice(0, 1) || null}</span>}
    </div>
  </div>
);
export default Logo;
