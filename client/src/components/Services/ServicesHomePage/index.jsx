/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-array-index-key */
import React, { useEffect } from 'react';
import CardSceleton from 'components/common/CardSceleton';
import { fetchLatestAdverts } from 'http/fetchLatestAdverts';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { jobsCategories, jobsItems } from 'constants/Jobs/jobsData';
import AdsItem from 'components/sale-components/ads-item';
import SaleNavigationItem from 'components/sale-components/sale-navigation-item';
import logo from 'assets/sad.png';
import styles from './index.module.scss';
import classNames from 'classnames';
import { getServicesBySection } from 'http/Services/getServicesBySection';
import { setAdverts, setStatus } from 'redux/reducers/advertReducer';

const ServicesHomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const { status, adverts } = useSelector((state) => state.advert);
  const theme = useSelector((state) => state.auth.theme);
  const renderData = params.category ? jobsItems : jobsCategories.slice(0, 2);
  useEffect(() => {
    if (params.category) {
      const { section } = jobsCategories.find((category) => category.link === `/${params.category}`);
      getServicesBySection(section);
    } else {
      dispatch(fetchLatestAdverts('services'));
    }
    return () => {
      dispatch(setAdverts(null));
      dispatch(setStatus(null));
    };
  }, [params.category]);
  return (
    <main className={classNames(styles.main, { [styles.light]: theme === 'light' })}>
      <div className={classNames(styles.navigation, ['category-navigation'])}>
        {renderData.map((e) => (
          <SaleNavigationItem
            key={e.id || e.key}
            item={e}
            className={params.category ? styles.navigation_category : styles.navigation_item}
          />
        ))}
      </div>
      <div className={classNames(styles.ads, ['category-ads'])}>
        <div className="category-ads__title">Объявления</div>
        <div className={classNames(styles.wrapper)}>
          {status === 'resolved' && (
            <>
              {adverts && adverts.length > 0 ? (
                adverts.map((advert) => (
                  <AdsItem
                    key={advert.jobId}
                    item={advert}
                    adCategory="services"
                    handleClick={() => {
                      const category = jobsCategories.find(
                        (saleSection) => saleSection.section === advert.sectionName
                      ).link;
                      const subCategory = jobsItems.find(
                        (saleSubSection) => saleSubSection.subsection === advert.subsectionName
                      ).search;
                      navigate(`/services${category}/${subCategory}/ad/${advert.jobId}`);
                    }}
                  />
                ))
              ) : (
                <div className={styles.empty}>
                  <img src={logo} alt="empty" /> <span>Ничего не найдено</span>
                </div>
              )}
            </>
          )}
          {status === 'loading' && (
            <>
              {Array(4)
                .fill()
                .map((item, i) => (
                  <CardSceleton key={i} />
                ))}
            </>
          )}
        </div>
      </div>
    </main>
  );
};
export default ServicesHomePage;
