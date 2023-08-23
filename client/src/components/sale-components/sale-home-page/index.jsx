/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-array-index-key */
import React, { useEffect } from 'react';
import './index.scss';
import { saleCategories, saleData } from 'constants/saleData';
import CardSceleton from 'components/common/CardSceleton';
import { fetchLatestAdverts } from 'http/fetchLatestAdverts';
import { useDispatch, useSelector } from 'react-redux';
import SaleNavigationItem from '../sale-navigation-item';
import AdsItem from '../ads-item';
import { useNavigate } from 'react-router-dom';
import { setAdverts, setStatus } from 'redux/reducers/advertReducer';

const SaleHomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status, adverts } = useSelector((state) => state.advert);
  useEffect(() => {
    dispatch(fetchLatestAdverts('sale'));
    return () => {
      dispatch(setStatus(null));
      dispatch(setAdverts(null));
    };
  }, []);
  return (
    <main className="sale-main-page">
      <div className="category-navigation">
        {saleCategories.map((e) => (
          <SaleNavigationItem key={e.id} item={e} withDropDown />
        ))}
      </div>
      <div className="category-ads">
        <div className="category-ads__title">Объявления</div>
        <div className="category-ads__wrapper">
          {status === 'resolved' && adverts && (
            <>
              {adverts.map((advert) => (
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
