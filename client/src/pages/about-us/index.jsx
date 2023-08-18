import React from 'react';
import './index.scss';
import Privacy from 'pages/privacy';
import Footer from 'components/footer';
import { useSelector } from 'react-redux';
import BrandBook from 'components/brandbook';
import SiteRules from 'components/siteRules';

const AboutUs = () => {
  const theme = useSelector((state) => state.auth.theme);
  return (
    <div className={`aboutUs aboutUs_${theme}`}>
      <div className="aboutUs-content">
        <BrandBook />
        <SiteRules />
        <Privacy />
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
