/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
/* eslint-disable camelcase */
export const transformWeatherData = (res) => {
  const data = res.list.reduce((acc, el, i, arr) => {
    const date = new Date(el.dt_txt).getDate();
    acc[date] = arr.filter((item) => new Date(item.dt_txt).getDate() === date);
    return acc;
  }, {});
  const newdata = Object.values(data)
    .slice(0, 5)
    .map((e) =>
      e.reduce((acc, el, i, arr) => {
        const dataItem = arr.filter((item) => item.dt_txt.includes('15:00:00'));

        console.log(dataItem);
        if (dataItem.length > 0) {
          const [
            {
              dt_txt,
              main: { temp, grnd_level, humidity },
              wind: { speed: wind },
              weather: [{ description, icon }],
            },
          ] = dataItem;
          acc = {
            dt_txt,
            temp,
            grnd_level,
            humidity,
            wind,
            description,
            icon,
          };
        }

        const weatherArray = i === 0 ? getWeatherArray(res.list.slice(0, 8)) : getWeatherArray(arr);
        if (i === 0) {
          const {
            dt_txt,
            main: { temp, grnd_level, humidity },
            wind: { speed: wind },
            weather: [{ description, icon }],
          } = arr[0];
          const renderData = {
            dt_txt,
            temp,
            grnd_level,
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
    temp: elem.main.temp,
    description: elem.weather[0].description,
    time: elem.dt_txt,
  }));
}
