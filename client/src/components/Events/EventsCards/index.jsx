/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import logo from 'assets/sad.png';
import AdsItem from 'components/sale-components/ads-item';
import { eventsCategories } from 'constants/eventsData';
import { getEventBySection } from 'http/Events/getEventBySection';

const EventsCards = () => {
  const { category } = useParams();
  const [renderData, setRenderData] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (category) {
      const { section } = eventsCategories.find((eventSection) => eventSection.link === `/${category}`);
      getEventBySection(section, setRenderData);
    }
  }, [category]);

  return (
    <section className="sale-ads-wrapper" id="service">
      {renderData && (
        <div className="sale-ads">
          {renderData.length === 0 ? (
            <div className="sale-ads__empty">
              <img src={logo} alt="empty" /> <span>Ничего не найдено</span>
            </div>
          ) : (
            renderData.map((advert) => (
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
