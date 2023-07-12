import React, { useEffect, useState } from 'react';
import './index.scss';
import Header from 'components/header';

const Weather = () => {
  const [weatherData, setWeatherData] = useState('');
  const apiKey = 'be37b681b59f77fe1aaf8f4ce71fa5ad';

  useEffect(() => {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Vitebsk&lang=ru&units=metric&APPID=${apiKey}`)
      .then((res) => {
        if (!res.ok) {
          console.log(res);
        }
        return res.json();
      })
      .then((res) => {
        // console.log(res.list);
        // const data = res.list.map((el) => new Date(el.dt_txt).getDate());
        const data = res.list.reduce((acc, el, i, arr) => {
          const date = new Date(el.dt_txt).getDate();
          acc[date] = arr.filter((item) => new Date(item.dt_txt).getDate() === date);
          return acc;
        }, {});
        console.log(data);
        setWeatherData(res);
      });
    // .catch((e) => {
    //   console.log(e);
    // });
  }, []);
  return (
    <div className="weather">
      <Header />
      {JSON.stringify(weatherData)}
    </div>
  );
};
export default Weather;
