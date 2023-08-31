import { url } from '../../constants/url';
import { refreshToken } from '../refreshToken';

export const changeFindStatus = async (findId) => {
  const token = localStorage.getItem('token');
  return fetch(`${url}/Finds/ChangeFindStatus`, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain',
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ findId }),
  }).catch((error) => {
    if (error.status === 401) {
      refreshToken(changeFindStatus, findId);
    } else console.log(error.statusText);
  });
};
