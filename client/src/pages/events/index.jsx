import React from 'react';
import './index.scss';
import { useDispatch, useSelector } from 'react-redux';
import BreadCrumb from 'components/common/breadcrumb';
import { eventsCategories } from 'constants/eventsData';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import SearchPannel from 'components/searchPannel';
import Button from 'components/common/button';
import { DatePicker } from 'antd';
import { getEventByDate } from 'http/Events/getEventsByDate';
import { setEvents } from 'redux/reducers/eventReducer';

const Events = () => {
  const { theme, isAdmin } = useSelector((state) => state.auth);
  const location = useLocation();
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const renderPage = eventsCategories.find(
    (category) => category.link === location.pathname || category.link === `/${params.category}`
  );
  const isSearchRender = params.eventId
    ? false
    : renderPage
    ? renderPage.hideSearch
      ? !renderPage.hideSearch
      : true
    : false;
  const onSelectDate = (_, dateString) => {
    if (dateString) {
      dispatch(setEvents(null));
      const { section } = eventsCategories.find((category) => category.link === `/${params.category}`);
      getEventByDate(new Date(dateString), section);
    }
  };
  return (
    <section id="events" className={`events events_${theme}`}>
      <div className="events_header">
        <BreadCrumb data={eventsCategories} className="events-breadCrumb" />
        {isSearchRender && (
          <div className="category-search">
            {renderPage && (
              <div className="category-search-name">
                <div className={`iconWrapper iconWrapper__${theme}`}>
                  <img className={`icon icon__${theme}`} src={renderPage.img} alt="category" />
                </div>
                {renderPage.name}
              </div>
            )}
            <SearchPannel />
            {isAdmin && (
              <Button
                type="primary"
                name="Создать мероприятие"
                handleClick={() => {
                  navigate('/events/createEvent');
                }}
              />
            )}
            {params.category && (
              <DatePicker
                placeholder="Календарь"
                onChange={onSelectDate}
                popupClassName="event-calendar"
                getPopupContainer={() => document.getElementById('events')}
              />
            )}
          </div>
        )}
      </div>
      <main>
        <Outlet />
      </main>
    </section>
  );
};
export default Events;
