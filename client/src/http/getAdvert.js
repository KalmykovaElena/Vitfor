import { url } from 'constants/url';
import { setAdvert } from 'redux/reducers/advertReducer';
import store from 'redux/store';
import { refreshToken } from './refreshToken';

export const getAdvert = (advertId) => {
  const token = localStorage.getItem('token') || '';
  fetch(`${url}/Adverts/GetAdvertCard`, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain',
      'Content-Type': 'application/json;charset=UTF-8',
      'ngrok-skip-browser-warning': '1',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      advertId,
    }),
  })
    .then(async (response) => {
      if (!response.ok) {
        if (response.status === 401) {
          refreshToken(getAdvert, advertId);
        }
        const res = await response.json();
        throw new Error(res.message);
      }
      return response.json();
    })
    .then((result) => {
      store.dispatch(setAdvert(result));
    })
    .catch((err) => {
      console.log(err);
    });
};
