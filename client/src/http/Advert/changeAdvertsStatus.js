import { url } from '../../constants/url';
import { refreshToken } from '../refreshToken';

export const changeAdvertsStatus = async (advertId) => {
  const token = localStorage.getItem('token');
  return fetch(`${url}/Adverts/ChangeAdvertStatus`, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain',
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ advertId }),
  }).catch((error) => {
    if (error.status === 401) {
      refreshToken(changeAdvertsStatus, advertId);
    } else console.log(error.statusText);
  });
};
