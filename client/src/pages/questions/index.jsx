import React from 'react';
import './index.scss';
import Header from 'components/header';
import Footer from 'components/footer';
import { useSelector } from 'react-redux';

const Questions = () => {
  const theme = useSelector((state) => state.auth.theme);
  return (
    <section className={`questions questions_${theme}`}>
      <Header />
      <main>Questions</main>
      <Footer />
    </section>
  );
};
export default Questions;
