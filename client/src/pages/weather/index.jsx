import React, { useEffect, useState } from 'react';
import './index.scss';
import Header from 'components/header';
import { getCurrentDate } from 'utils/getCurrentDate';
import bg from 'assets/bg-weather.png';
import day from 'assets/sunny.png';
import windy from 'assets/🦆 icon _strong wind_.svg';
import { transformWeatherData } from 'utils/transformWeatherData';

const Weather = () => {
  const apiKey = 'be37b681b59f77fe1aaf8f4ce71fa5ad';
  const [renderData, setRenderData] = useState('');
  const [renderlist, setRenderList] = useState('');

  useEffect(() => {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Vitebsk&lang=ru&units=metric&APPID=${apiKey}`)
      .then((res) => {
        if (!res.ok) {
          const text = res.json();
          throw new Error(text.message);
        }
        return res.json();
      })
      .then((res) => {
        const data = transformWeatherData(res);
        console.log(data);
        setRenderList(data);
        setRenderData(data[0].renderData);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div className="weather" style={{ backgroundImage: `url(${bg})` }}>
      <Header />
      {renderData && (
        <div className="weather-wrapper">
          <div className="current-block">
            <div className="weather-img">
              <img src={`http://openweathermap.org/img/wn/${renderData.icon}@2x.png`} alt="" />
            </div>
            <div>
              <div>{getCurrentDate(renderData.dt_txt, 'short', 'ru', 'numeric')}</div>
              <div className="weather-value">
                <span>{Math.round(renderData.temp)}</span>°C
              </div>
            </div>
            <div className="weather-description">
              <div>{renderData.description}</div>
              <div>
                {' '}
                <img src={windy} alt="wind" /> {renderData.wind}м/с
              </div>
              <div> влажность</div>
              <div>{renderData.humidity} %</div>
              <div>давление</div>
              <div>{renderData.grnd} мм.рт.ст</div>
            </div>
            <div className="weather-time">
              {renderData.weatherArray.map((el) => (
                <div key={Date.now() + el.time} className="weather-time-item">
                  <div className="weather-time-item__time">{el.time}</div>
                  <div className="weather-time-item__icon">
                    <img src={`http://openweathermap.org/img/wn/${el.icon}@2x.png`} alt="icon" />
                  </div>
                  <div className="weather-time-item__temp">{el.temp}°C</div>
                </div>
              ))}
            </div>
          </div>
          <div className="feature-block">
            {renderlist.map((el) => {
              const item = el.dt_txt ? el : el.renderData;
              return (
                <div
                  key={item.dt_txt}
                  className="feature-block__item"
                  onClick={() => setRenderData(el.renderData ? el.renderData : el)}
                >
                  <div>{getCurrentDate(item.dt_txt, 'short', 'ru')}</div>
                  <div className="weather-img">
                    <img src={`http://openweathermap.org/img/wn/${item.icon}@2x.png`} alt="" />
                  </div>
                  <div>
                    <img src={day} alt="day" /> {Math.round(item.temp)} °C
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
export default Weather;
