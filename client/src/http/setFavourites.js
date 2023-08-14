import { url } from 'constants/url';
import { refreshToken } from './refreshToken';

export const setFavourites = (advertId, method) => {
  const token = localStorage.getItem('token');
  const path = method === 'POST' ? 'AddToFavourites' : 'DeleteFromFavourites';
  fetch(`${url}/Favourites/${path}`, {
    method,
    headers: {
      Accept: 'application/json, text/plain',
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      advertId,
    }),
  })
    .then(async (response) => {
      if (!response.ok) {
        if (response.status === 401) {
          refreshToken(setFavourites, advertId, method);
        }
        const res = await response.json();
        console.log(res);
        throw new Error(res.message);
      }
      return response.json();
    })
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
};
