import { setUser } from 'redux/reducers/authReducer';
import { url } from 'constants/url';
import { refreshToken } from './refreshToken';

export const updateUserData = (formData, dispatch, navigate, setIsSend) => {
  const token = localStorage.getItem('token');

  fetch(`${url}/Account/FillingAccountInfo`, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain',
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formData),
  })
    .then(async (response) => {
      if (!response.ok) {
        if (response.status === 401) {
          refreshToken(token, navigate, updateUserData, dispatch, formData);
        }
        const res = await response.json();
        throw new Error(res.message);
      }
      return response.json();
    })
    .then((result) => {
      console.log(result);
      setIsSend(true);
      dispatch(setUser(result));
    })
    .catch((err) => {
      console.log(err);
    });
};
