import { url } from 'constants/url';
import { refreshToken } from './refreshToken';

export const changePhoneNumber = (data, navigate, dispatch, setSuccess) => {
  const token = localStorage.getItem('token');

  fetch(`${url}/Account/ChangePhoneNumber`, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain',
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: `Bearer ${token}`,
      Host: `${url}`,
    },
    body: JSON.stringify({
      newPhoneNumber: data.phone,
    }),
  })
    .then(async (response) => {
      if (!response.ok) {
        if (response.status === 401) {
          refreshToken(token, navigate, changePhoneNumber, dispatch, data);
        }
        const res = await response.json();
        throw new Error(res.message);
      }
      return response.json();
    })
    .then((result) => {
      console.log(result);
      setSuccess(true);
    })
    .catch((err) => {
      console.log(err);
    });
};
