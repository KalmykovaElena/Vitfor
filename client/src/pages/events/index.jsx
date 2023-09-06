import React from 'react';
import './index.scss';
import { useSelector } from 'react-redux';
import BreadCrumb from 'components/common/breadcrumb';
import { eventsCategories } from 'constants/eventsData';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import SearchPannel from 'components/searchPannel';

const Events = () => {
  const theme = useSelector((state) => state.auth.theme);
  const location = useLocation();
  const params = useParams();
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
