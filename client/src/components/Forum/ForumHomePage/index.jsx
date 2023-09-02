import SaleNavigationItem from 'components/sale-components/sale-navigation-item';
import { forumCategories } from 'constants/forumData';
import React from 'react';
import './index.scss';

const ForumHomePage = () => (
  <section className="forum-home">
    {forumCategories.slice(0, 18).map((e) => (
      <SaleNavigationItem key={e.id} item={e} />
    ))}
  </section>
);

export default ForumHomePage;
