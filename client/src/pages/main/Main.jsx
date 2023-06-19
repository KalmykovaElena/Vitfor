import React from 'react';
import CurrentInfo from '../../components/currentInfo/CurrentInfo';
import './main.scss';
import background from '../../assets/bg-img.png';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import SearchPannel from '../../components/searchPannel/SearchPannel';

export default function Main() {
  return (
    <div className="main" style={{ backgroundImage: `url(${background})` }}>
      <Header />
      <SearchPannel />
      <CurrentInfo />
      <Footer />
    </div>
  );
}
