import React, { useEffect, useState } from 'react';
import './index.scss';
import { saleData } from 'constants/saleData';
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
        {saleData.slice(4).map((e) => (
          <SaleNavigationItem key={e.id} item={e} />
        ))}
      </div>
      <div className="sale-ads">
        {renderData && (
          <>
            <div className="sale-ads__title">Объявления</div>
            <div className="sale-ads__wrapper">
              {renderData.map((e) => (
                <AdsItem key={e.advertId} item={e} />
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
};
export default SaleHomePage;
