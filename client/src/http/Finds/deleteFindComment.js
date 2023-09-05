import { url } from 'constants/url';
import { refreshToken } from 'http/refreshToken';
import { getFind } from './getFind';
import store from 'redux/store';

export const deleteFindComment = (commentId, advertId) => {
  const token = localStorage.getItem('token');
  fetch(`${url}/FindComments/DeleteFindComment`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json, text/plain',
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      commentId,
    }),
  })
    .then(async (response) => {
      if (!response.ok) {
        if (response.status === 401) {
          refreshToken(deleteFindComment, commentId, advertId);
        }
        const res = await response.json();
        throw new Error(res.message);
      }
      return response.json();
    })
    .then((result) => {
      console.log(result);
      store.dispatch(getFind(advertId));
    })
    .catch((err) => {
      console.log(err);
    });
};
