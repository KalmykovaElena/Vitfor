import React from 'react';
import './index.scss';
import Footer from 'components/footer';
import { useSelector } from 'react-redux';

const Forum = () => {
  const theme = useSelector((state) => state.auth.theme);
  return (
    <section className={`forum forum_${theme}`}>
      <main>Forum</main>
      <Footer />
    </section>
  );
};

export default Forum;
