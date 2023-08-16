/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import './index.scss';
import { saleCategories } from 'constants/saleData';
import { getRandomAdvert } from 'http/getRandomAdvert';
import CardSceleton from 'components/common/CardSceleton';
import SaleNavigationItem from '../sale-navigation-item';
import AdsItem from '../ads-item';

const SaleHomePage = () => {
  const [renderData, setRenderData] = useState('');
  useEffect(() => {
    getRandomAdvert(setRenderData);
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
          {renderData ? (
            <>
              {renderData.map((advert) => (
                <AdsItem key={advert.advertId} item={advert} />
              ))}
            </>
          ) : (
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
