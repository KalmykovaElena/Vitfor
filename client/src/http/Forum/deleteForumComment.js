import { url } from 'constants/url';
import { refreshToken } from 'http/refreshToken';
import { getForumTheme } from './getForumTheme';

export const deleteForumComment = (messageId, parentId) => {
  const token = localStorage.getItem('token');
  fetch(`${url}/TopicMessages/DeleteTopicMessage`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json, text/plain',
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      messageId,
    }),
  })
    .then(async (response) => {
      if (!response.ok) {
        if (response.status === 401) {
          refreshToken(deleteForumComment, messageId, parentId);
        }
        const res = await response.json();
        throw new Error(res.message);
      }
      return response.json();
    })
    .then((result) => {
      console.log(result);
      getForumTheme(parentId);
    })
    .catch((err) => {
      console.log(err);
    });
};
