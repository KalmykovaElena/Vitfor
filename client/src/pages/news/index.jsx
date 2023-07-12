import React from 'react';
import './index.scss';
import Header from 'components/header';

const News = () => (
  <div className="news">
    <Header />
    <form method="get" title="Search Form" action="https://cse.google.com/cse/publicurl">
      <div>
        <input type="text" id="q" name="q" title="Search this site" alt="Search Text" maxLength="256" />
        <input type="hidden" id="cx" name="cx" value="013626029654558379071:ze3tw4csia4" />
        <input
          type="image"
          id="searchSubmit"
          name="submit"
          src="https://www.flaticon.com/free-icon/active-search-symbol_34148"
          alt="Go"
          title="Submit Search Query"
        />
      </div>
    </form>
  </div>
);

export default News;
