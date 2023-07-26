import React from 'react';
import './index.scss';
import { useSelector } from 'react-redux';
import Header from 'components/header';
import BreadCrumb from 'components/common/breadcrumb';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import { saleData } from 'constants/saleData';
import SearchPannel from 'components/searchPannel';
import Button from 'components/common/button';

const Sale = () => {
  const theme = useSelector((state) => state.auth.theme);
  const params = useParams();
  const location = useLocation();
  const renderPage =
    saleData.find((item) => item.link === `/${params.category}`) ||
    saleData.find((item) => item.link === location.pathname);
  const path = location.pathname.split('/').slice(-1)[0];
  const isSearchRender = path !== 'ad' && Number.isNaN(Number(path));

  return (
    <section className={`sale sale_${theme}`}>
      <Header />
      <BreadCrumb data={saleData} className="sale-breadCrumb" />
      {isSearchRender && (
        <div className="sale-search">
          {renderPage && (
            <div className="sale-search-name">
              <div className="sale-search-icon">
                <img src={renderPage.img} alt="sale" />
              </div>
              {renderPage.name}
            </div>
          )}
          <SearchPannel />
          <Button name="Подать объявление" type="primary" />
        </div>
      )}
      <Outlet />
    </section>
  );
};
export default Sale;
