import { url } from 'constants/url';
import { setIsAuth, setUser } from 'redux/reducers/authReducer';
import { getUserProfile } from './getUserProfile';

export const verifyingGoogleResponse = (tokenResponse, dispatch, navigate, page) => {
  fetch(`${url}/Auth/GoogleAuthentication`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'ngrok-skip-browser-warning': '1',
    },
    body: JSON.stringify(tokenResponse),
  })
    .then(async (response) => {
      if (!response.ok) {
        const res = await response.json();
        throw new Error(res.message);
      }

      return response.json();
    })
    .then((result) => {
      navigate(`/${page}`);
      dispatch(setIsAuth(true));
      dispatch(setUser(result));
      localStorage.setItem('token', result.token);
      localStorage.setItem('refreshToken', result.refreshToken);
      if (!page) {
        getUserProfile();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
