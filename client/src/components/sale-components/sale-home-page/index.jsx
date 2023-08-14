import React, { useEffect, useState } from 'react';
import './index.scss';
import { saleCategories } from 'constants/saleData';
import { getRandomAdvert } from 'http/getRandomAdvert';
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
        {renderData && (
          <>
            <div className="sale-ads__title">Объявления</div>
            <div className="sale-ads__wrapper">
              {renderData.map((advert) => (
                <AdsItem key={advert.advertId} item={advert} />
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
};
export default SaleHomePage;
