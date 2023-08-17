import { url } from '../../constants/url';
import { refreshToken } from '../refreshToken';

export const updateAdvert = async (advert) => {
  const token = localStorage.getItem('token');
  await fetch(`${url}/Adverts/UpdateAdvert`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(advert),
  }).catch((response) => {
    if (response.status === 401) {
      refreshToken(updateAdvert, advert);
    } else console.log(response.statusText);
  });
};
