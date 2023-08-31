import { url } from 'constants/url';
import { refreshToken } from 'http/refreshToken';

export const setFindFavourites = (findId, method) => {
  const token = localStorage.getItem('token');
  const path = method === 'POST' ? 'AddToFindFavourites' : 'DeleteFromFindFavourites';
  fetch(`${url}/FindFavourites/${path}`, {
    method,
    headers: {
      Accept: 'application/json, text/plain',
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      findId,
    }),
  })
    .then(async (response) => {
      if (!response.ok) {
        if (response.status === 401) {
          refreshToken(setFindFavourites, findId, method);
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
