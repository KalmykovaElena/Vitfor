import { setUser } from 'redux/reducers/authReducer';
import { url } from 'constants/url';
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';
import { refreshToken } from './refreshToken';

export const updateUserData = (dispatch) => (formData, setIsSend, setError) => {
  const token = localStorage.getItem('token');
  fetch(`${url}/Account/FillingAccountInfo`, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain',
      'Content-Type': 'application/json;charset=UTF-8',
      'ngrok-skip-browser-warning': '1',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formData),
  })
    .then(async (response) => {
      if (!response.ok) {
        if (response.status === 401) {
          refreshToken(updateUserData, formData, setIsSend, setError);
        }
        const res = await response.json();
        if (res.message.includes('already exists')) {
          setError('userName', { type: '400', message: 'Такое имя уже зарегистрировано в системе!' });
        }
        throw new Error(res.message);
      }
      return response.json();
    })
    .then((result) => {
      const decoded = jwt_decode(token);
      setIsSend(true);
      dispatch(setUser({ ...result, userEmail: decoded.email }));
    })
    .catch((err) => {
      console.log(err);
    });
};
