/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import logo from 'assets/sad.png';
import AdsItem from 'components/sale-components/ads-item';
import { eventsCategories } from 'constants/eventsData';
import { getEventBySection } from 'http/Events/getEventBySection';
import { useDispatch, useSelector } from 'react-redux';
import { setEvents } from 'redux/reducers/eventReducer';

const EventsCards = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { events } = useSelector((state) => state.event);
  useEffect(() => {
    if (category) {
      const { section } = eventsCategories.find((eventSection) => eventSection.link === `/${category}`);
      getEventBySection(section);
    }
  }, [category]);
  useEffect(() => () => dispatch(setEvents(null)), []);

  return (
    <section className="sale-ads-wrapper" id="service">
      <div className="events-title"> Мероприятия</div>
      {events && (
        <div className="sale-ads">
          {events.length === 0 ? (
            <div className="sale-ads__empty">
              <img src={logo} alt="empty" /> <span>Ничего не найдено</span>
            </div>
          ) : (
            events.map((advert) => (
              <AdsItem
                key={advert.eventId}
                item={advert}
                type="long"
                handleClick={() => {
                  const { link } = eventsCategories.find(
                    (eventSection) => eventSection.section === advert.subsectionName
                  );
                  navigate(`/events${link}/event/${advert.eventId}`);
                }}
              />
            ))
          )}
        </div>
      )}
    </section>
  );
};

export default EventsCards;
