import React from 'react';
import CurrentTime from './currentTime/CurrentTime';
import CurrentWeather from './currentWeather/CurrentWeather';
import logo from '../../assets/logo.png';
import photo1 from '../../assets/photo-1.png';
import photo2 from '../../assets/photo-2.png';
import photo3 from '../../assets/photo-3.png';
import photo4 from '../../assets/photo-4.png';
import './currentInfo.scss';

export default function CurrentInfo() {
  return (
    <div className="currentInfo">
      <div className="currentInfo-wrapper">
        <div className="currentInfo-logo">
          <img src={logo} alt="logo" />
        </div>
        <h1 className="currentInfo-name">ВитФор</h1>
        <div className="currentInfo-description">Сообщество города Витебска</div>
        <div className="currentInfo-date">
          <div>{`${new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'numeric' })}`}</div>
          <CurrentWeather />
          <CurrentTime />
        </div>
        <div className="currentInfo-photos">
          <img src={photo1} className="img__offset item-1" alt="avatar" />
          <img src={photo2} className="img__offset item-2" alt="avatar" />
          <img src={photo3} className="img__offset item-3" alt="avatar" />
          <img src={photo4} className="img__offset item-4" alt="avatar" />
          +2 тыс
        </div>
      </div>
    </div>
  );
}
