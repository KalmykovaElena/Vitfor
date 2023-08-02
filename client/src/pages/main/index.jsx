import React from 'react';
import './index.scss';
import background from 'assets/bg-img.png';
import light from 'assets/bg-img-light.png';
import Header from 'components/header';
import SearchPannel from 'components/searchPannel';
import Footer from 'components/footer';
import CurrentInfo from 'components/currentInfo';
import { useSelector } from 'react-redux';

const Main = () => {
  const theme = useSelector((state) => state.auth.theme);
  const bg = theme === 'dark' ? background : light;
  return (
    <div className={`main main__${theme}`} style={{ backgroundImage: `url(${bg})` }}>
      <Header />
      <SearchPannel />
      <CurrentInfo />
      <Footer />
    </div>
  );
};

export default Main;
