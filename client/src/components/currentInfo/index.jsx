import React, { useState } from 'react';
import logo from 'assets/logo.png';
import photo1 from 'assets/photo-1.png';
import photo2 from 'assets/photo-2.png';
import photo3 from 'assets/photo-3.png';
import photo4 from 'assets/photo-4.png';
import './index.scss';
import CurrentWeather from 'components/currentWeather';
import CurrentTime from 'components/currentTime';
import { useSelector } from 'react-redux';

const CurrentInfo = () => {
  const [timeLoading, setTimeLoading] = useState(true);
  const theme = useSelector((state) => state.auth.theme);

  return (
    <div className="currentInfo">
      <div className={`currentInfo-wrapper${timeLoading ? ' partialhidden' : ' show'}`}>
        <div className="currentInfo-logo">
          <img src={logo} alt="logo" />
        </div>
        <h1 className="currentInfo-name">VitFor</h1>
        <div className={`currentInfo-description_${theme}`}>Сообщество города Витебска</div>
        <div className={`currentInfo-date currentInfo-date_${theme} ${timeLoading ? 'hidden' : 'show'}`}>
          <div className={`currentInfo-date__details${timeLoading ? ' hidden' : ' show'}`}>
            <div>{`${new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'numeric' })}`}</div>
            <CurrentWeather />
            <CurrentTime onLoad={setTimeLoading} />
          </div>
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
};
export default CurrentInfo;
