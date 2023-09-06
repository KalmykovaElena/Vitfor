import React from 'react';
import './index.scss';
import { useSelector } from 'react-redux';
import BreadCrumb from 'components/common/breadcrumb';
import { eventsCategories } from 'constants/eventsData';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import SearchPannel from 'components/searchPannel';
import Button from 'components/common/button';

const Events = () => {
  const { theme, isAdmin } = useSelector((state) => state.auth);
  const location = useLocation();
  const params = useParams();
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
  return (
    <section className={`events events_${theme}`}>
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
