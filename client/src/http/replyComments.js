import { url } from 'constants/url';
import { refreshToken } from './refreshToken';
import { getAdvert } from './getAdvert';

export const replyComment = (advertId, text, parentCommentId) => {
  const token = localStorage.getItem('token');
  fetch(`${url}/Comments/ReplyComment`, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain',
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      advertId,
      text,
      parentCommentId,
    }),
  })
    .then(async (response) => {
      if (!response.ok) {
        if (response.status === 401) {
          refreshToken(replyComment, advertId, text, parentCommentId);
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
