import React from 'react';
import './index.scss';
import Footer from 'components/footer';
import { useSelector } from 'react-redux';

const Finds = () => {
  const theme = useSelector((state) => state.auth.theme);
  return (
    <section className={`finds finds_${theme}`}>
      <main>Finds</main>
      <Footer />
    </section>
  );
};

export default Finds;
