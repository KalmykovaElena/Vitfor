import { url } from '../../constants/url';
import { refreshToken } from '../refreshToken';

export const deleteAdvert = async (advertId) => {
  const token = localStorage.getItem('token');
  await fetch(`${url}/Adverts/DeleteAdvert`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json, text/plain',
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ advertId }),
  }).catch((response) => {
    if (response.status === 401) {
      refreshToken(deleteAdvert, advertId);
    } else console.log(response.statusText);
  });
};
