import React from 'react';
import './index.scss';
import { useSelector } from 'react-redux';
import Header from 'components/header';
import Footer from 'components/footer';

const Sale = () => {
  const theme = useSelector((state) => state.auth.theme);
  console.log(theme);
  return (
    <section className={`sale sale_${theme}`}>
      <Header />
      <main>Sale</main>
      <Footer />
    </section>
  );
};
export default Sale;
