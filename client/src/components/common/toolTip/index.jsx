import React from 'react';
import './index.scss';

const ToolTip = ({ children, text }) => (
  <div className="tooltip-container">
    <div className="tooltip"> {text}</div>
    {children}
  </div>
);

export default ToolTip;
