import { url } from '../../constants/url';
import { refreshToken } from '../refreshToken';

export const createServices = (data, reset, setSuccess) => {
  const token = localStorage.getItem('token');
  fetch(`${url}/Jobs/CreateJob`, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain',
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      reset();
      setSuccess(true);
      response.json();
    })
    .catch((error) => {
      if (error.status === 401) {
        refreshToken(createServices, reset, setSuccess);
      } else console.log(error.statusText);
    });
};
