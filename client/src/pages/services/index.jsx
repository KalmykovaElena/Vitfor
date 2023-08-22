import React from 'react';
import styles from './index.module.scss';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import BreadCrumb from 'components/common/breadcrumb';
import { jobsCategories } from 'constants/Jobs/jobsData';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import SearchPannel from 'components/searchPannel';
import Button from 'components/common/button';

const Services = () => {
  const theme = useSelector((state) => state.auth.theme);
  const location = useLocation();
  const params = useParams();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const navigate = useNavigate();
  const renderPage = jobsCategories.find(
    (category) => category.link === `/${params.category}` || category.link === location.pathname
  );
  const isSearchRender = renderPage ? (renderPage.hideSearch ? !renderPage.hideSearch : true) : false;
  const handleClick = () => {
    if (isAuth) {
      navigate('/services/createService');
    } else {
      navigate('/registration');
    }
  };
  return (
    <section className={classNames(styles.services, { [styles.light]: theme === 'light' })}>
      <div className={styles.services_header}>
        <BreadCrumb data={jobsCategories} className={styles.breadCrumb} />
        {isSearchRender && (
          <div className="category-search">
            {renderPage && (
              <div className="category-search-name">
                <div className="category-search-icon">
                  <img src={renderPage.img} alt="category" />
                </div>
                {renderPage.name}
              </div>
            )}
            <SearchPannel />
            <Button name="Разместить услугу" type="primary" handleClick={handleClick} />
          </div>
        )}
      </div>
      <Outlet />
    </section>
  );
};
export default Services;
