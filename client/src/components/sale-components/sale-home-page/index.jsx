import React from 'react';
import './index.scss';
import { saleData } from 'constants/saleData';
import { testMain } from 'constants/test';
import SaleNavigationItem from '../sale-navigation-item';
import AdsItem from '../ads-item';

const SaleHomePage = () => (
  <main className="sale-main-page">
    <div className="sale-navigation">
      {saleData.slice(4).map((e) => (
        <SaleNavigationItem key={e.id} item={e} />
      ))}
    </div>
    <div className="sale-ads">
      <div className="sale-ads__title">Объявления</div>
      <div className="sale-ads__wrapper">
        {testMain.map((e) => (
          <AdsItem key={e.advertId} item={e} />
        ))}
      </div>
    </div>
  </main>
);

export default SaleHomePage;
