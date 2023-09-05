import SaleNavigationItem from 'components/sale-components/sale-navigation-item';
import { forumCategories } from 'constants/forumData';
import React from 'react';
import './index.scss';
import { useSelector } from 'react-redux';

const ForumHomePage = () => {
  const theme = useSelector((state) => state.auth.theme);
  return (
    <section className={`forum-home forum-home__${theme}`}>
      <div className="forum-home_wrapper">
        {forumCategories.slice(0, 18).map((e) => (
          <SaleNavigationItem key={e.id} item={e} />
        ))}
      </div>
    </section>
  );
};

export default ForumHomePage;
