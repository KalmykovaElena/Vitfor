import React from 'react';
import './index.scss';
import { useSelector } from 'react-redux';
import BreadCrumb from 'components/common/breadcrumb';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { saleData } from 'constants/saleData';
import SearchPannel from 'components/searchPannel';
import Button from 'components/common/button';

const Sale = () => {
  const theme = useSelector((state) => state.auth.theme);
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname.split('/').slice(-1)[0];
  const renderPage =
    saleData.find((item) => item.link === `/${params.category}` || item.link === `/${path}`) ||
    saleData.find((item) => item.link === location.pathname);
  const isSearchRender = renderPage ? (renderPage.hideSearch ? !renderPage.hideSearch : true) : false;
  const isAuth = useSelector((state) => state.auth.isAuth);
  console.log(location.pathname);
  const handleClick = () => {
    if (isAuth) {
      navigate('/sale/adplacing');
    } else {
      navigate('/registration');
    }
  };

  return (
    <section className={`sale sale_${theme}`}>
      <BreadCrumb data={saleData} className="sale-breadCrumb" />
      {isSearchRender && (
        <div className="sale-search">
          {renderPage && renderPage.img && (
            <div className="sale-search-name">
              <div className="sale-search-icon">
                <img src={renderPage.img} alt="sale" />
              </div>

              {renderPage.name}
            </div>
          )}
          <SearchPannel />
          <Button name="Подать объявление" type="primary" handleClick={handleClick} />
        </div>
      )}
      <Outlet />
    </section>
  );
};
export default Sale;
