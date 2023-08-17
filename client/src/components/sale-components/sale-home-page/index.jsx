/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-array-index-key */
import React, { useEffect } from 'react';
import './index.scss';
import { saleCategories } from 'constants/saleData';
import CardSceleton from 'components/common/CardSceleton';
import { fetchLatestAdverts } from 'http/fetchLatestAdverts';
import { useDispatch, useSelector } from 'react-redux';
import SaleNavigationItem from '../sale-navigation-item';
import AdsItem from '../ads-item';

const SaleHomePage = () => {
  const dispatch = useDispatch();
  const { status, adverts } = useSelector((state) => state.advert);
  useEffect(() => {
    dispatch(fetchLatestAdverts());
  }, []);
  return (
    <main className="sale-main-page">
      <div className="sale-navigation">
        {saleCategories.map((e) => (
          <SaleNavigationItem key={e.id} item={e} />
        ))}
      </div>
      <div className="sale-ads">
        <div className="sale-ads__title">Объявления</div>
        <div className="sale-ads__wrapper">
          {status === 'resolved' && (
            <>
              {adverts.map((advert) => (
                <AdsItem key={advert.advertId} item={advert} />
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
export default SaleHomePage;
