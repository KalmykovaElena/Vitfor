import { url } from 'constants/url';
import { refreshToken } from './refreshToken';
import store from 'redux/store';
import { setSearchItems } from 'redux/reducers/searchReducer';

export const getUserAdverts = () => {
  const token = localStorage.getItem('token') || '';
  fetch(`${url}/GetUserAdverts`, {
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
          refreshToken(getUserAdverts);
        }
        const res = await response.json();
        throw new Error(res.message);
      }
      return response.json();
    })
    .then((result) => {
      store.dispatch(setSearchItems(result));
    })
    .catch((err) => {
      console.log(err);
    });
};
