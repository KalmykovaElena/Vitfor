import { url } from 'constants/url';
import { refreshToken } from 'http/refreshToken';

export const setForumFavourites = (topicId, method) => {
  const token = localStorage.getItem('token');
  const path = method === 'POST' ? 'AddToTopicFavourites' : 'DeleteFromTopicFavourites';
  fetch(`${url}/TopicFavourites/${path}`, {
    method,
    headers: {
      Accept: 'application/json, text/plain',
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      topicId,
    }),
  })
    .then(async (response) => {
      if (!response.ok) {
        if (response.status === 401) {
          refreshToken(setForumFavourites, topicId, method);
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
