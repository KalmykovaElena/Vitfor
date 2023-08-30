/* eslint-disable no-return-assign */
import { url } from 'constants/url';
import store from 'redux/store';
import { setSearchItems } from 'redux/reducers/searchReducer';
import { refreshToken } from './refreshToken';

export const getFavouritesAdverts = () => {
  const token = localStorage.getItem('token') || '';
  fetch(`${url}/GetUserFavourites`, {
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
          refreshToken(getFavouritesAdverts);
        }
        const res = await response.json();
        throw new Error(res.message);
      }
      return response.json();
    })
    .then((result) => {
      const fafourites = Object.keys(result).reduce((acc, category) => {
        acc[category] = result[category].map((advert) => {
          advert.isFavourite = true;
          return advert;
        });
        return acc;
      }, {});
      store.dispatch(setSearchItems(fafourites));
    })
    .catch((err) => {
      console.log(err);
    });
};
