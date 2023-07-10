import React from 'react';
import { NavLink } from 'react-router-dom';
import { footerData } from 'constants/footerData';
import './index.scss';
import { useSelector } from 'react-redux';

const Footer = () => {
  const theme = useSelector((state) => state.auth.theme);
  return (
    <footer className={`footer footer_${theme}`}>
      {footerData.map((e) => (
        <div className="footer-item" key={e.id}>
          <img src={e.img} alt="logo" />
          <NavLink to={e.link}> {e.name}</NavLink>
        </div>
      ))}
    </footer>
  );
};

export default Footer;
