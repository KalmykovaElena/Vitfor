import { url } from 'constants/url';
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';
import { setIsAuth } from 'redux/reducers/authReducer';

export const refreshToken = (token, navigate, funk, dispatch, data) => {
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
      console.log(response);
      if (!response.ok) {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        const res = await response.json();
        dispatch(setIsAuth(false));
        navigate(`/`);
        throw new Error(res.message);
      }
      return response.json();
    })
    .then((result) => {
      localStorage.setItem('token', result.token);
      localStorage.setItem('refreshToken', result.refreshToken);
      console.log('new token get');
      dispatch(setIsAuth(true));
      if (funk) {
        funk(data, dispatch, navigate);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
