import { getUserAdverts } from 'http/getUserAdverts';
import { url } from '../../constants/url';
import { refreshToken } from '../refreshToken';

export const updateAdvert = async (advert, setSuccess) => {
  const token = localStorage.getItem('token');
  await fetch(`${url}/Adverts/UpdateAdvert`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(advert),
  })
    .then(async (response) => {
      if (response.ok) {
        getUserAdverts();
        setSuccess('Объявление успешно обновлено');
      }
    })
    .catch((response) => {
      if (response.status === 401) {
        refreshToken(updateAdvert, advert);
      } else console.log(response.statusText);
    });
};
