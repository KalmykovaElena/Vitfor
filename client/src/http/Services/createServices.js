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
    .then(async (response) => {
      if (!response.ok) {
        if (response.status === 401) {
          refreshToken(createServices, reset, setSuccess);
        }
        const res = await response.json();
        throw new Error(res.message);
      }
      return response.json();
    })
    .then(() => {
      reset();
      setSuccess(true);
    })
    .catch((error) => {
      console.log(error);
    });
};
