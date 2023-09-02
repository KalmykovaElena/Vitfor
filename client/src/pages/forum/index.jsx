import React from 'react';
import './index.scss';
import { useSelector } from 'react-redux';
import BreadCrumb from 'components/common/breadcrumb';
import { forumCategories } from 'constants/forumData';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import SearchPannel from 'components/searchPannel';
import Button from 'components/common/button';

const Forum = () => {
  const theme = useSelector((state) => state.auth.theme);
  const location = useLocation();
  const params = useParams();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const navigate = useNavigate();
  const renderPage = forumCategories.find(
    (category) => category.link === location.pathname || category.link === `/${params.category}`
  );
  const isSearchRender =
    params.findId || location.pathname.split('/').slice(-1)[0] === 'createTheme'
      ? false
      : renderPage
      ? renderPage.hideSearch
        ? !renderPage.hideSearch
        : true
      : false;
  const handleClick = () => {
    if (isAuth) {
      navigate(`/forum/${params.category}/createTheme`);
    } else {
      navigate('/registration');
    }
  };
  const renderSection = forumCategories.find((category) => category.link === '/forum');
  return (
    <section className={`forum forum_${theme}`}>
      <div className="forum-wrapper">
        <div className="forum_header">
          <BreadCrumb data={forumCategories} className="forum-breadCrumb" />
          {isSearchRender && (
            <div className="category-search">
              <div className="category-search-name">
                <img src={renderSection.img} alt="category" />
                {renderSection.name}
              </div>

              <SearchPannel />
              <Button name="Создать тему" type="primary" handleClick={handleClick} />
            </div>
          )}
        </div>
        <main>
          <Outlet />
        </main>
      </div>
    </section>
  );
};

export default Forum;
