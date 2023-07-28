/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
/* eslint-disable camelcase */
export const transformWeatherData = (res) => {
  const data = res.list.reduce((acc, el, i, arr) => {
    const date = el.dt_txt.split(' ')[0];
    acc[date] = arr.filter((item) => item.dt_txt.split(' ')[0] === date);
    return acc;
  }, {});

  const newdata = Object.values(data)
    .slice(0, 5)
    .map((e, index) =>
      e.reduce((acc, el, i, arr) => {
        const dataItem = arr.filter((item) => item.dt_txt.includes('15:00:00'));

        if (dataItem.length > 0) {
          const [
            {
              dt_txt,
              main: { temp, grnd_level, humidity },
              wind: { speed: wind },
              weather: [{ id, description, icon }],
            },
          ] = dataItem;
          const grnd = (grnd_level * 0.750063755419211).toFixed(0);
          acc = {
            id: getWeatherCategory(id),
            date: dt_txt.split(' ')[0],
            dt_txt,
            temp: temp > 0 ? `+ ${Math.round(temp)}` : temp,
            grnd,
            humidity,
            wind,
            description: description.charAt(0).toUpperCase() + description.slice(1),
            icon,
          };
        }

        const weatherArray = index === 0 ? getWeatherArray(res.list.slice(0, 8)) : getWeatherArray(arr);
        if (index === 0) {
          const {
            dt_txt,
            main: { temp, grnd_level, humidity },
            wind: { speed: wind },
            weather: [{ id, description, icon }],
          } = arr[0];
          const grnd = (grnd_level * 0.750063755419211).toFixed(0);
          const renderData = {
            id: getWeatherCategory(id),
            date: dt_txt.split(' ')[0],
            dt_txt,
            temp: temp > 0 ? `+ ${Math.round(temp)}` : temp,
            grnd,
            humidity,
            wind,
            description: description.charAt(0).toUpperCase() + description.slice(1),
            icon,
            weatherArray,
          };
          acc = {
            ...acc,
            renderData,
          };
        }

        acc = {
          ...acc,
          weatherArray,
        };
        return acc;
      }, {})
    );
  return newdata;
};

function getWeatherArray(arr) {
  return arr.map((elem) => ({
    temp: Math.round(elem.main.temp),
    description: elem.weather[0].description,
    time: elem.dt_txt.split(' ').slice(1).join('').split(':').slice(0, 2).join(':'),
    icon: elem.weather[0].icon,
  }));
}

function getWeatherCategory(num) {
  if (num === 800) {
    return 'clear';
  }
  if (num === 803 || num === 804) {
    return 'cloudy';
  }
  if (num >= 600 && num <= 622) {
    return 'snow';
  }
  if (num >= 200 && num <= 232) {
    return 'thunderstorm';
  }
  if ((num >= 500 && num <= 531) || (num >= 300 && num <= 321)) {
    return 'rain';
  }
  return 'fewclouds';
}
