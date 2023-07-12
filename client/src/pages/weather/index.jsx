import React, { useEffect, useState } from 'react';
import './index.scss';
import Header from 'components/header';
import { useDispatch, useSelector } from 'react-redux';
import { setNextWeatherData, setWeatherData } from 'redux/reducers/weatherReducer';
import { getCurrentDate } from 'utils/getCurrentDate';
import bg from 'assets/bg-weather.png';
import day from 'assets/sunny.png';
import night from 'assets/moon.png';
import wind from 'assets/🦆 icon _strong wind_.svg';

const Weather = () => {
  const dispatch = useDispatch();
  const apiKey = 'be37b681b59f77fe1aaf8f4ce71fa5ad';
  const currentData = useSelector((state) => state.weathher.weatherData);
  const nextData = useSelector((state) => state.weathher.nextWeatherData);
  const [renderData, setRenderData] = useState('');
  console.log(currentData);
  console.log(nextData);

  useEffect(() => {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Vitebsk&lang=ru&units=metric&APPID=${apiKey}`)
      .then((res) => {
        if (!res.ok) {
          console.log(res);
        }
        return res.json();
      })
      .then((res) => {
        const data = res.list.reduce((acc, el, i, arr) => {
          const date = new Date(el.dt_txt).getDate();
          acc[date] = arr.filter((item) => new Date(item.dt_txt).getDate() === date);
          return acc;
        }, {});
        const currentDate = new Date(Date.now()).getDate();
        console.log(Object.values(data)[0]);
        setRenderData({ ...data[currentDate][0], night: data[currentDate].slice(-1)[0]?.main?.temp });
        dispatch(setWeatherData(data[currentDate]));
        dispatch(
          setNextWeatherData(
            Object.values(data)
              .slice(1)
              .map((el) => el.filter((item) => item.dt_txt.includes('12:00:00') || item.dt_txt.includes('21:00:00')))
          )
        );
      });
    // .catch((e) => {
    //   console.log(e);
    // });
  }, []);
  console.log(renderData);
  return (
    <div className="weather" style={{ backgroundImage: `url(${bg})` }}>
      <Header />
      {renderData && (
        <div className="weather-wrapper">
          <div className="current-block">
            <div className="weather-img">
              <img src={`http://openweathermap.org/img/wn/${renderData?.weather[0]?.icon}@2x.png`} alt="" />
            </div>
            <div>
              <div>{getCurrentDate(renderData?.dt_txt, 'short', 'ru', 'numeric')}</div>
              <div className="weather-value">
                <span>{Math.round(renderData?.main?.temp)}</span>°C
              </div>
            </div>
            <div className="weather-description">
              <div>{renderData?.weather[0]?.description}</div>
              <div>
                {' '}
                <img src={wind} alt="wind" /> {renderData?.wind?.speed}м/с
              </div>
            </div>
          </div>
          <div className="feature-block">
            {nextData?.map((el) => {
              if (el.length > 0) {
                return (
                  <div
                    className="feature-block__item"
                    onClick={() => setRenderData({ ...el[0], night: el[1]?.main?.temp })}
                  >
                    <div>{getCurrentDate(el[0]?.dt_txt, 'short', 'ru')}</div>
                    <div className="weather-img">
                      <img src={`http://openweathermap.org/img/wn/${el[0]?.weather[0]?.icon}@2x.png`} alt="" />
                    </div>
                    <div>
                      <img src={day} alt="day" /> {Math.round(el[0]?.main?.temp)} днем
                    </div>
                    <div>
                      <img src={night} alt="night" />
                      {Math.round(el[1]?.main?.temp)} ночью
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      )}
    </div>
  );
};
export default Weather;
