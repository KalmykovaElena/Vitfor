import { url } from 'constants/url';
import { refreshToken } from './refreshToken';
import { getAdvert } from './getAdvert';

export const setComment = (advertId, text) => {
  const token = localStorage.getItem('token');
  fetch(`${url}/Comments/CreateComment`, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain',
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      advertId,
      text,
    }),
  })
    .then(async (response) => {
      if (!response.ok) {
        if (response.status === 401) {
          refreshToken(setComment, advertId, text);
        }
        const res = await response.json();
        console.log(res);
        throw new Error(res.message);
      }
      return response.json();
    })
    .then((result) => {
      console.log(result);
      getAdvert(advertId);
    })
    .catch((err) => {
      console.log(err);
    });
};
