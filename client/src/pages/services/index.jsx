import React from 'react';
import './index.scss';
import Footer from 'components/footer';
import { useSelector } from 'react-redux';

const Services = () => {
  const theme = useSelector((state) => state.auth.theme);
  return (
    <section className={`services services_${theme}`}>
      <main>Services</main>
      <Footer />
    </section>
  );
};
export default Services;
