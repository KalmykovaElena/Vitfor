/* eslint-disable react-hooks/exhaustive-deps */
import { getFavouritesAdverts } from 'http/getFavouritesAdverts';
import { searchOnApp } from 'http/searchOnApp';
import React, { useEffect } from 'react';
import { saleCategories } from '../../constants/saleData';
import { advertTitles } from 'constants/advertTitles';
import { setSearchItems } from 'redux/reducers/searchReducer';
import { nanoid } from 'nanoid';
import logo from 'assets/sad.png';
import { useDispatch, useSelector } from 'react-redux';
import AdsItem from 'components/sale-components/ads-item';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import styles from './index.module.scss';
import { jobsCategories } from 'constants/Jobs/jobsData';
import { getAdvertSections } from 'utils/getAdvertSections';

const UserSearch = () => {
  const searchItems = useSelector((state) => state.search.searchItems);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('value');
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (searchQuery) {
      searchOnApp(searchQuery);
    }
    if (params.category === 'favourites') {
      getFavouritesAdverts();
    }
    return () => dispatch(setSearchItems(null));
  }, [searchQuery]);
  return (
    <div>
      {' '}
      {searchItems && (
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
                      {searchItems[AdvertCategory].map((searchItem) => {
                        let category;
                        let sections;
                        if (AdvertCategory === 'adverts') {
                          category = 'sale';
                          sections = getAdvertSections(
                            saleCategories,
                            searchItem.sectionName,
                            searchItem.subsectionName
                          );
                        } else if (AdvertCategory === 'jobs') {
                          category = 'services';
                          sections = getAdvertSections(
                            jobsCategories,
                            searchItem.sectionName,
                            searchItem.subsectionName
                          );
                        }
                        return (
                          <AdsItem
                            item={searchItem}
                            key={nanoid()}
                            handleClick={() => {
                              navigate(
                                `/${category}/${sections.section}/${sections.subsection}/ad/${
                                  searchItem.advertId || searchItem.jobId
                                }`
                              );
                            }}
                          />
                        );
                      })}
                    </div>
                  </div>
                );
              }
              return null;
            })
          )}
        </div>
      )}
    </div>
  );
};

export default UserSearch;
