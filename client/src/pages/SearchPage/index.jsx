/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import Footer from 'components/footer';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import AdsItem from 'components/sale-components/ads-item';
import { searchOnApp } from 'http/searchOnApp';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { setSearchItems } from 'redux/reducers/searchReducer';
import { nanoid } from 'nanoid';
import logo from 'assets/sad.png';
import { getFavouritesAdverts } from 'http/getFavouritesAdverts';
import styles from './index.module.scss';
import { saleData } from '../../constants/saleData';
import { getUserAdverts } from 'http/getUserAdverts';
import { advertTitles } from 'constants/advertTitles';
import UserAds from 'components/sale-components/UserAds';

const SearchPage = () => {
  const theme = useSelector((state) => state.auth.theme);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname.split('/').slice(-1)[0];
  const searchQuery = searchParams.get('value');
  const searchItems = useSelector((state) => state.search.searchItems);
  const dispatch = useDispatch();

  useEffect(() => {
    if (searchQuery) {
      searchOnApp(searchQuery);
    }
    if (path === 'favourites') {
      getFavouritesAdverts();
    }
    if (path === 'user_ads') {
      getUserAdverts();
    }
    return () => dispatch(setSearchItems(null));
  }, [searchQuery, path]);
  return (
    <section className={classNames(styles.wrapper, { [styles.light]: theme === 'light' })}>
      <main className={styles.main}>
        {searchItems && (
          <>
            {path === 'user_ads' ? (
              <UserAds />
            ) : (
              <div className={styles.contentWrapper}>
                {Object.values(searchItems).every((array) => array.length === 0) ? (
                  <div className="sale-ads__empty">
                    <img src={logo} alt="empty" /> <span>Ничего не найдено</span>
                  </div>
                ) : (
                  Object.keys(searchItems).map((AdvertCategory) => {
                    if (searchItems[AdvertCategory].length > 0) {
                      return (
                        <div className={styles.category} key={AdvertCategory}>
                          <div className={styles.title}>{advertTitles[AdvertCategory]}</div>
                          <div className={styles.content}>
                            {searchItems[AdvertCategory].map((searchItem) => (
                              <AdsItem
                                item={searchItem}
                                key={nanoid()}
                                handleClick={() => {
                                  const pathData = saleData.find((saleSection) =>
                                    saleSection.items?.find(
                                      (saleSubSection) => saleSubSection.subsection === searchItem.subsectionName
                                    )
                                  );
                                  const category = pathData.link;
                                  const subCategory = pathData.items.find(
                                    (saleSubSection) => saleSubSection.subsection === searchItem.subsectionName
                                  ).search;
                                  if (subCategory) {
                                    navigate(`/sale/${category.slice(1)}/${subCategory}/ad/${searchItem.advertId}`);
                                  } else if (category) {
                                    navigate(`/sale/${category.slice(1)}/ad/${searchItem.advertId}`);
                                  }
                                }}
                              />
                            ))}
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })
                )}
              </div>
            )}
          </>
        )}
      </main>
      <Footer />
    </section>
  );
};

export default SearchPage;
