import { url } from 'constants/url';
import { refreshToken } from 'http/refreshToken';
import { getFind } from './getFind';
import store from 'redux/store';

export const setReplyFindComment = (findId, text, parentCommentId) => {
  const token = localStorage.getItem('token');
  fetch(`${url}/FindComments/ReplyFindComment`, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain',
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      findId,
      text,
      parentCommentId,
    }),
  })
    .then(async (response) => {
      if (!response.ok) {
        if (response.status === 401) {
          refreshToken(setReplyFindComment, findId, text, parentCommentId);
        }
        const res = await response.json();
        throw new Error(res.message);
      }
      return response.json();
    })
    .then((result) => {
      console.log(result);
      store.dispatch(getFind(findId));
    })
    .catch((err) => {
      console.log(err);
    });
};
