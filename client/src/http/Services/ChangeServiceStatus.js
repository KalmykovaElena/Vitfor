import { url } from 'constants/url';
import { refreshToken } from 'http/refreshToken';

export const changeServiceStatus = async (jobId) => {
  const token = localStorage.getItem('token');
  return fetch(`${url}/Jobs/ChangeJobStatus`, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain',
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ jobId }),
  }).catch((error) => {
    if (error.status === 401) {
      refreshToken(changeServiceStatus, jobId);
    } else console.log(error.statusText);
  });
};
