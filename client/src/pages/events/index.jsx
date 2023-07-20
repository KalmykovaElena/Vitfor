import React from 'react';
import './index.scss';
import Header from 'components/header';
import Footer from 'components/footer';
import { useSelector } from 'react-redux';

const Events = () => {
  const theme = useSelector((state) => state.auth.theme);
  return (
    <section className={`events events_${theme}`}>
      <Header />
      <main>Events</main>
      <Footer />
    </section>
  );
};
export default Events;
