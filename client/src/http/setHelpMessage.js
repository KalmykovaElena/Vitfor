import { url } from 'constants/url';
import { refreshToken } from './refreshToken';

export const setHelpMessage = (formData, dispatch, navigate, setSuccess) => {
  const token = localStorage.getItem('token');
  fetch(`${url}/Account/Support`, {
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
          refreshToken(token, navigate, setHelpMessage, dispatch, formData);
        }
        const res = await response.json();
        throw new Error(res.message);
      }
      return response.json();
    })
    .then((result) => {
      setSuccess(true);
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
};
