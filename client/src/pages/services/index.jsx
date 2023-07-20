import React from 'react';
import './index.scss';
import Header from 'components/header';
import Footer from 'components/footer';
import { useSelector } from 'react-redux';

const Services = () => {
  const theme = useSelector((state) => state.auth.theme);
  return (
    <section className={`services services_${theme}`}>
      <Header />
      <main>Services</main>
      <Footer />
    </section>
  );
};
export default Services;
