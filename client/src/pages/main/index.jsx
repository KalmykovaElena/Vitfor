import React from 'react';
import './index.scss';
import background from 'assets/bg-img.png';
import Header from 'components/header';
import SearchPannel from 'components/searchPannel';
import Footer from 'components/footer';
import CurrentInfo from 'components/currentInfo';

const Main = () => (
  <div className="main" style={{ backgroundImage: `url(${background})` }}>
    <Header />
    <SearchPannel />
    <CurrentInfo />
    <Footer />
  </div>
);

export default Main;
