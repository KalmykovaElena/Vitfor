import React from 'react';
import styles from './index.module.scss';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import BreadCrumb from 'components/common/breadcrumb';
import { jobsCategories } from 'constants/Jobs/jobsData';
import { Outlet, useLocation } from 'react-router-dom';
import SearchPannel from 'components/searchPannel';
import Button from 'components/common/button';

const Services = () => {
  const theme = useSelector((state) => state.auth.theme);
  const location = useLocation();
  const renderPage = jobsCategories.find((category) => category.link === location.pathname);
  const handleClick = () => {
    // if (isAuth) {
    //   navigate('/sale/adplacing');
    // } else {
    //   navigate('/registration');
    // }
  };
  return (
    <section className={classNames(styles.services, { [styles.light]: theme === 'light' })}>
      <div className={styles.services_header}>
        <BreadCrumb data={jobsCategories} className={styles.breadCrumb} />
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
      </div>
      <Outlet />
    </section>
  );
};
export default Services;
