/* eslint-disable no-return-assign */
import { url } from 'constants/url';
import store from 'redux/store';
import { setSearchItems } from 'redux/reducers/searchReducer';
import { refreshToken } from './refreshToken';

export const getFavouritesAdverts = () => {
  const token = localStorage.getItem('token') || '';
  fetch(`${url}/BuySell/GetUserFavourites`, {
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
      console.log(result); // TODO удалить
      const adverts = result.map((advert) => {
        // TODO изменить когда ответ будет разделен по разделам
        advert.isFavourite = true;
        return advert;
      });
      store.dispatch(setSearchItems({ favourites: adverts }));
    })
    .catch((err) => {
      console.log(err);
    });
};
