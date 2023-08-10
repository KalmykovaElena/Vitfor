import { url } from 'constants/url';

export const getRandomAdvert = (setRenderData) => {
  fetch(`${url}/Adverts/GetFourNewestAdverts`, {
    headers: {
      Accept: 'application/json, text/plain',
      'Content-Type': 'application/json;charset=UTF-8',
      'ngrok-skip-browser-warning': '1',
    },
  })
    .then(async (response) => {
      if (!response.ok) {
        const res = await response.json();
        throw new Error(res.message);
      }
      return response.json();
    })
    .then((result) => {
      setRenderData(result);
    })
    .catch((err) => {
      console.log(err);
    });
};
