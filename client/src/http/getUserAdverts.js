import { url } from 'constants/url';
import { refreshToken } from './refreshToken';

export const getUserAdverts = (setRenderData) => {
  const token = localStorage.getItem('token') || '';
  fetch(`${url}/Adverts/GetUserAdverts`, {
    headers: {
      Accept: 'application/json, text/plain',
      'Content-Type': 'application/json;charset=UTF-8',
      'ngrok-skip-browser-warning': '1',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(async (response) => {
      if (!response.ok) {
        if (response.status === 401) {
          refreshToken(getUserAdverts, setRenderData);
        }
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
