import React, { useEffect, useState } from 'react';

const CurrentWeather = () => {
  const [temp, setTemp] = useState('');
  const apiKey = 'be37b681b59f77fe1aaf8f4ce71fa5ad';
  useEffect(() => {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Vitebsk&lang=ru&units=metric&APPID=${apiKey}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('city not found');
        }
        return res.json();
      })
      .then((data) => {
        setTemp(Math.floor(Number(data.list[0].main.temp)));
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return <div>{temp}°</div>;
};
export default CurrentWeather;
