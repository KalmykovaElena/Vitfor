import React from 'react';
import { NavLink } from 'react-router-dom';
import { footerData } from 'constants/footerData';
import './index.scss';

const Footer = () => (
  <footer className="footer">
    {footerData.map((e) => (
      <div className="footer-item" key={e.id}>
        <img src={e.img} alt="logo" />
        <NavLink to={e.link}> {e.name}</NavLink>
      </div>
    ))}
  </footer>
);

export default Footer;
