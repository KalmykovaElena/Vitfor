/* eslint-disable import/no-extraneous-dependencies */
import { url } from 'constants/url';
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';
import { setIsAuth } from 'redux/reducers/authReducer';
import store from 'redux/store';
import { history } from 'utils/history';

export const refreshToken = (funk, ...rest) => {
  const token = localStorage.getItem('token');
  const refToken = localStorage.getItem('refreshToken');
  const decoded = jwt_decode(token);

  fetch(`${url}/Auth/RefreshToken`, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain',
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      token,
      userEmail: decoded.email,
      refreshToken: refToken,
    }),
  })
    .then(async (response) => {
      if (!response.ok) {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        const res = await response.json();
        store.dispatch(setIsAuth(false));
        history.navigate(`/`);
        throw new Error(res.message);
      }
      return response.json();
    })
    .then((result) => {
      localStorage.setItem('token', result.token);
      localStorage.setItem('refreshToken', result.refreshToken);
      console.log('new token get');
      store.dispatch(setIsAuth(true));
      if (funk) {
        funk(...rest);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
