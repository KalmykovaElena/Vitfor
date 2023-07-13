/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
/* eslint-disable camelcase */
export const transformWeatherData = (res) => {
  const data = res.list.reduce((acc, el, i, arr) => {
    const date = new Date(el.dt_txt).getDate();
    acc[date] = arr.filter((item) => new Date(item.dt_txt).getDate() === date);
    return acc;
  }, {});
  console.log(data);
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
              weather: [{ description, icon }],
            },
          ] = dataItem;
          const grnd = (grnd_level * 0.750063755419211).toFixed(0);
          acc = {
            dt_txt,
            temp,
            grnd,
            humidity,
            wind,
            description,
            icon,
          };
        }

        const weatherArray = index === 0 ? getWeatherArray(res.list.slice(0, 8)) : getWeatherArray(arr);
        if (index === 0) {
          const {
            dt_txt,
            main: { temp, grnd_level, humidity },
            wind: { speed: wind },
            weather: [{ description, icon }],
          } = arr[0];
          const grnd = (grnd_level * 0.750063755419211).toFixed(0);
          const renderData = {
            dt_txt,
            temp,
            grnd,
            humidity,
            wind,
            description,
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
