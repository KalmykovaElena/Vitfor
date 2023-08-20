import { url } from 'constants/url';
import { setIsAuth, setTheme, setUser } from 'redux/reducers/authReducer';
import { refreshToken } from 'http/refreshToken';
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';
import store from 'redux/store';

export const getUserProfile = () => {
  const token = localStorage.getItem('token');
  fetch(`${url}/Account/GetUserProfile`, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'ngrok-skip-browser-warning': '1',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(async (response) => {
      if (!response.ok) {
        if (response.status === 401) {
          console.log(response);
          refreshToken(getUserProfile);
        }
        const res = await response.text();
        throw new Error(res);
      }
      return response.json();
    })
    .then((result) => {
      const decoded = jwt_decode(token);
      store.dispatch(setIsAuth(true));
      store.dispatch(setUser({ ...result, userEmail: decoded.email }));
      if (result.themeName) store.dispatch(setTheme(result.themeName));
    })
    .catch((err) => {
      console.log(err);
    });
};
