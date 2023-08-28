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
  const isSearchRender = params.jobId
    ? false
    : renderPage
    ? renderPage.hideSearch
      ? !renderPage.hideSearch
      : true
    : false;
  const handleClick = () => {
    if (isAuth) {
      navigate('/services/createService');
    } else {
      navigate('/registration');
    }
  };
  return (
    <section id="services" className={classNames(styles.services, { [styles.light]: theme === 'light' })}>
      <div className={styles.services_header}>
        <BreadCrumb
          data={jobsCategories}
          className={classNames(styles.breadCrumb, { [styles.breadCrumb_light]: theme === 'light' })}
        />
        {isSearchRender && (
          <div className="category-search">
            {renderPage && (
              <div className="category-search-name">
                <div className={classNames(styles.iconWrapper, { [styles.iconWrapperLight]: theme === 'light' })}>
                  <img
                    className={classNames({ [styles.iconLight]: theme === 'light' })}
                    src={renderPage.img}
                    alt="category"
                  />
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
