/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-array-index-key */
import React, { useEffect } from 'react';
// import './index.scss';
import CardSceleton from 'components/common/CardSceleton';
import { fetchLatestAdverts } from 'http/fetchLatestAdverts';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { jobsCategories, jobsItems } from 'constants/Jobs/jobsData';
import AdsItem from 'components/sale-components/ads-item';
import SaleNavigationItem from 'components/sale-components/sale-navigation-item';

const ServicesHomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const { status, adverts } = useSelector((state) => state.advert);
  const renderData = params.category ? jobsItems : jobsCategories.slice(0, 2);
  useEffect(() => {
    dispatch(fetchLatestAdverts('services'));
  }, []);

  return (
    <main className="services-main-page">
      <div className="category-navigation">
        {renderData.map((e) => (
          <SaleNavigationItem key={e.id} item={e} />
        ))}
      </div>
      <div className="category-ads">
        <div className="category-ads__title">Объявления</div>
        <div className="category-ads__wrapper">
          {status === 'resolved' && (
            <>
              {adverts.map((advert) => (
                <AdsItem
                  key={advert.advertId}
                  item={advert}
                  handleClick={() => {
                    const category = jobsCategories.find((saleSection) => saleSection.section === advert.section).link;
                    const subCategory = jobsItems.find(
                      (saleSubSection) => saleSubSection.subsection === advert.subsectionName
                    ).search;
                    navigate(`/sale/${category.slice(1)}/${subCategory}/ad/${advert.advertId}`);
                  }}
                />
              ))}
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
