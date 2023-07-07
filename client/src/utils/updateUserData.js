// import { setUser } from 'redux/reducers/authReducer';

import { setUser } from 'redux/reducers/authReducer';
import { refreshToken } from './refreshToken';

export const updateUserData = (formData, dispatch, navigate) => {
  const url = process.env.REACT_APP_BASEURL;
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
          refreshToken(url, token, navigate, updateUserData, dispatch, formData);
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
      // dispatch(setIsAuth(true));
      dispatch(setUser(result));
      // token
    })
    .catch((err) => {
      console.log(err);
    });
};
