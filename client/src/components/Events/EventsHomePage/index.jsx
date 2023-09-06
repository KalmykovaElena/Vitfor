/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-array-index-key */
import React, { useEffect } from 'react';
import './index.scss';
import CardSceleton from 'components/common/CardSceleton';
import { fetchLatestAdverts } from 'http/fetchLatestAdverts';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setAdverts, setStatus } from 'redux/reducers/advertReducer';
import SaleNavigationItem from 'components/sale-components/sale-navigation-item';
import AdsItem from 'components/sale-components/ads-item';
import { eventsCategories } from 'constants/eventsData';

const EventsHomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status, adverts } = useSelector((state) => state.advert);
  useEffect(() => {
    dispatch(fetchLatestAdverts('events'));
    return () => {
      dispatch(setStatus(null));
      dispatch(setAdverts(null));
    };
  }, []);

  return (
    <div className="events-main-page">
      <div className="category-navigation">
        {eventsCategories.slice(0, 6).map((e) => (
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
                  key={advert.eventId}
                  item={advert}
                  adCategory="finds"
                  handleClick={() => {
                    const { link } = eventsCategories.find((item) => item.section === advert.subsectionName);
                    navigate(`/events${link}/event/${advert.eventId}`);
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
    </div>
  );
};
export default EventsHomePage;
