import { url } from 'constants/url';
import { setIsAuth, setUser } from 'redux/reducers/authReducer';
import { refreshToken } from 'http/refreshToken';
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';

export const getUserProfile = (token, navigate, dispatch) => {
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
          refreshToken(token, navigate, getUserProfile, dispatch, token);
        }
        const res = await response.text();
        throw new Error(res);
      }
      return response.json();
    })
    .then((result) => {
      const decoded = jwt_decode(token);
      console.log(decoded);
      dispatch(setIsAuth(true));
      dispatch(setUser({ ...result, userEmail: decoded.email }));
    })
    .catch((err) => {
      console.log(err);
    });
};
