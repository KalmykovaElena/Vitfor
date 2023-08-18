import React from 'react';
import { useNavigate } from 'react-router-dom';
import { footerData } from 'constants/footerData';
import './index.scss';
import { useSelector } from 'react-redux';

const Footer = () => {
  const navigate = useNavigate();
  const theme = useSelector((state) => state.auth.theme);
  return (
    <footer className={`footer footer_${theme}`}>
      {footerData.map((e) => (
        <div className="footer-item" key={e.id} onClick={() => navigate(e.link)}>
          <img src={e.img} alt="logo" />
          <span>{e.name}</span>
        </div>
      ))}
    </footer>
  );
};

export default Footer;
