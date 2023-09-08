import React from 'react';
import './index.scss';
import { useSelector } from 'react-redux';
import BreadCrumb from 'components/common/breadcrumb';
import { findsCategories } from 'constants/findsData';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import SearchPannel from 'components/searchPannel';
import Button from 'components/common/button';

const Finds = () => {
  const theme = useSelector((state) => state.auth.theme);
  const location = useLocation();
  const params = useParams();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const navigate = useNavigate();
  const renderPage = findsCategories.find(
    (category) => category.link === `/${params.category}` || category.link === location.pathname
  );
  const isSearchRender = params.findId
    ? false
    : renderPage
    ? renderPage.hideSearch
      ? !renderPage.hideSearch
      : true
    : false;
  const handleClick = () => {
    if (isAuth) {
      navigate('/finds/createFind');
    } else {
      navigate('/registration');
    }
  };
  return (
    <section className={`finds finds_${theme}`}>
      <div className="finds_header">
        <BreadCrumb data={findsCategories} className="finds-breadCrumb" />
        {isSearchRender && (
          <div className="category-search">
            {renderPage && renderPage.img && (
              <div className="category-search-name">
                <div className="category-search-icon">
                  <img src={renderPage.img3} alt="category" />
                </div>
                {renderPage.name}
              </div>
            )}
            <SearchPannel />
            <Button name="Подать объявление" type="primary" handleClick={handleClick} />
          </div>
        )}
      </div>
      <Outlet />
    </section>
  );
};

export default Finds;
