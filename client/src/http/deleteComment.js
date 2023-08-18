import { url } from 'constants/url';
import { refreshToken } from './refreshToken';
import { getAdvert } from './getAdvert';

export const deleteComment = (id, advertId) => {
  const token = localStorage.getItem('token');
  fetch(`${url}/Comments/DeleteComment`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json, text/plain',
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      commentId: id,
    }),
  })
    .then(async (response) => {
      if (!response.ok) {
        if (response.status === 401) {
          refreshToken(deleteComment, id, advertId);
        }
        const res = await response.json();
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
