import React, { useEffect, useState } from 'react';
import './index.scss';
import { saleCategories, saleData } from 'constants/saleData';
import { getRandomAdvert } from 'http/getRandomAdvert';
import SaleNavigationItem from '../sale-navigation-item';
import AdsItem from '../ads-item';
import { useNavigate } from 'react-router-dom';

const SaleHomePage = () => {
  const [renderData, setRenderData] = useState('');
  const navigate = useNavigate();
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
                <AdsItem
                  key={advert.advertId}
                  item={advert}
                  handleClick={() => {
                    const pathData = saleData.find((saleSection) =>
                      saleSection.items?.find((saleSubSection) => saleSubSection.subsection === advert.subsectionName)
                    );
                    const category = pathData.link;
                    const subCategory = pathData.items.find(
                      (saleSubSection) => saleSubSection.subsection === advert.subsectionName
                    ).search;
                    if (subCategory) {
                      navigate(`/sale/${category.slice(1)}/${subCategory}/ad/${advert.advertId}`);
                    } else if (category) {
                      navigate(`/sale/${category.slice(1)}/ad/${advert.advertId}`);
                    }
                  }}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
};
export default SaleHomePage;
