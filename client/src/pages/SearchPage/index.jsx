/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import Footer from 'components/footer';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import styles from './index.module.scss';

const SearchPage = () => {
  const theme = useSelector((state) => state.auth.theme);
  return (
    <section className={classNames(styles.wrapper, { [styles.light]: theme === 'light' })}>
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </section>
  );
};

export default SearchPage;
