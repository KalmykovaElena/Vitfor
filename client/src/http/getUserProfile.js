import { url } from 'constants/url';
import { setIsAuth, setUser } from 'redux/reducers/authReducer';
import { refreshToken } from 'http/refreshToken';

export const getUserProfile = (token, navigate, dispatch) => {
  fetch(`${url}/Account/GetUserProfile`, {
    // method: 'GET',
    // // mode: 'no-cors',
    headers: {
      // Accept: 'application/json, text/plain',
      'Content-Type': 'application/json;charset=UTF-8',
      'ngrok-skip-browser-warning': '1',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(async (response) => {
      console.log(response);
      if (!response.ok) {
        if (response.status === 401) {
          refreshToken(token, navigate, getUserProfile, dispatch, token);
        }
        const res = await response.text();
        throw new Error(res);
      }
      console.log(response);
      return response.json();
    })
    .then((result) => {
      console.log(result);
      // goToPage('personal_info/data');
      dispatch(setIsAuth(true));
      dispatch(setUser(result));
      // token
    })
    .catch((err) => {
      console.log(err);
    });
};
