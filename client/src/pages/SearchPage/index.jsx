/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import Header from 'components/header';
import Footer from 'components/footer';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import AdsItem from 'components/sale-components/ads-item';
import { searchOnApp } from 'http/searchOnApp';
import { useLocation, useSearchParams } from 'react-router-dom';
import { setSearchItems } from 'redux/reducers/searchReducer';
import { nanoid } from 'nanoid';
import logo from 'assets/sad.png';
import { getFavouritesAdverts } from 'http/getFavouritesAdverts';
import styles from './index.module.scss';

const SearchPage = () => {
  const theme = useSelector((state) => state.auth.theme);
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const path = location.pathname.split('/').slice(-1)[0];
  const searchQuery = searchParams.get('value');
  const searchItems = useSelector((state) => state.search.searchItems);
  const dispatch = useDispatch();
  const titles = {
    adverts: 'Объявления',
    favourites: 'Избранное',
  };

  useEffect(() => {
    if (searchQuery) {
      searchOnApp(searchQuery);
    }
    if (path === 'favourites') {
      getFavouritesAdverts();
    }
    return () => dispatch(setSearchItems(null));
  }, [searchQuery, path]);
  return (
    <section className={classNames(styles.wrapper, { [styles.light]: theme === 'light' })}>
      <Header />
      <main className={styles.main}>
        {searchItems && (
          <div>
            {Object.values(searchItems).every((array) => array.length === 0) ? (
              <div className="sale-ads__empty">
                <img src={logo} alt="empty" /> <span>Ничего не найдено</span>
              </div>
            ) : (
              Object.keys(searchItems).map((category) => (
                <div className={styles.category} key={category}>
                  <div className={styles.title}>{titles[category]}</div>
                  <div className={styles.content}>
                    {searchItems[category].map((searchItem) => (
                      <AdsItem item={searchItem} key={nanoid()} />
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </main>
      <Footer />
    </section>
  );
};

export default SearchPage;
