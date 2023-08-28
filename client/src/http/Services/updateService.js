import { getUserAdverts } from 'http/getUserAdverts';
import { url } from '../../constants/url';
import { refreshToken } from '../refreshToken';

export const updateService = async (service, setSuccess) => {
  const token = localStorage.getItem('token');
  await fetch(`${url}/Jobs/UpdateJob`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(service),
  })
    .then(async (response) => {
      if (response.ok) {
        getUserAdverts();
        setSuccess('Услуга успешно обновлена');
      }
    })
    .catch((response) => {
      if (response.status === 401) {
        refreshToken(updateService, service);
      } else console.log(response.statusText);
    });
};
