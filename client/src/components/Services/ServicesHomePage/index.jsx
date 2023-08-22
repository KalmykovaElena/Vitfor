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
import { getServices } from 'http/Services/getServices';

const ServicesHomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  const { status, adverts } = useSelector((state) => state.advert);
  const renderData = params.category ? jobsItems : jobsCategories.slice(0, 2);
  useEffect(() => {
    if (params.category) {
      const { section } = jobsCategories.find((category) => category.link === `/${params.category}`);
      getServices(section);
    } else {
      dispatch(fetchLatestAdverts('services'));
    }
  }, [params.category]);
  console.log(params.category);
  return (
    <main>
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
              {adverts.length > 0 ? (
                adverts.map((advert) => (
                  <AdsItem
                    key={advert.jobId}
                    item={advert}
                    adCategory="services"
                    handleClick={() => {
                      const category = jobsCategories.find(
                        (saleSection) => saleSection.section === advert.section
                      ).link;
                      const subCategory = jobsItems.find(
                        (saleSubSection) => saleSubSection.subsection === advert.subsectionName
                      ).search;
                      navigate(`/sale/${category.slice(1)}/${subCategory}/ad/${advert.advertId}`);
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
