/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-array-index-key */
import React, { useEffect } from 'react';
import './index.scss';
import CardSceleton from 'components/common/CardSceleton';
import { fetchLatestAdverts } from 'http/fetchLatestAdverts';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setAdverts, setStatus } from 'redux/reducers/advertReducer';
import { findsCategories } from 'constants/findsData';
import SaleNavigationItem from 'components/sale-components/sale-navigation-item';
import AdsItem from 'components/sale-components/ads-item';

const FindsHomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status, adverts } = useSelector((state) => state.advert);
  useEffect(() => {
    dispatch(fetchLatestAdverts('finds'));
    return () => {
      dispatch(setStatus(null));
      dispatch(setAdverts(null));
    };
  }, []);

  return (
    <main className="finds-main-page">
      <div className="category-navigation">
        {findsCategories.slice(0, 2).map((e) => (
          <SaleNavigationItem key={e.id} item={e} />
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
                    const { link } = findsCategories.find((item) => item.section === advert.sectionName);
                    navigate(`/finds${link}/ad/${advert.advertId}`);
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
export default FindsHomePage;
