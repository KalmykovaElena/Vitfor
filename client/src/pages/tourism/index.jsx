import React from 'react';
import './index.scss';
import Header from 'components/header';
import Footer from 'components/footer';
import { useSelector } from 'react-redux';

const Tourism = () => {
  const theme = useSelector((state) => state.auth.theme);
  return (
    <section className={`tourism tourism_${theme}`}>
      <Header />
      <main>Tourism</main>
      <Footer />
    </section>
  );
};

export default Tourism;
