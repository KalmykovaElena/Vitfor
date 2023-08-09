import React from 'react';
import './index.scss';
import Header from 'components/header';
import Footer from 'components/footer';
import { useSelector } from 'react-redux';

const Finds = () => {
  const theme = useSelector((state) => state.auth.theme);
  return (
    <section className={`finds finds_${theme}`}>
      <Header />
      <main>Finds</main>
      <Footer />
    </section>
  );
};

export default Finds;
