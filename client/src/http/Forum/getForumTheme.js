import store from 'redux/store';
import { url } from '../../constants/url';
import { refreshToken } from '../refreshToken';
import { setForumTheme } from 'redux/reducers/forumReducer';

// eslint-disable-next-line consistent-return
export const getForumTheme = (topicId) => {
  const token = localStorage.getItem('token');
  fetch(`${url}/Topics/GetTopicCard`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ topicId }),
  })
    .then(async (response) => {
      if (!response.ok) {
        if (response.status === 401) {
          refreshToken(getForumTheme, topicId);
        }
        const res = await response.json();
        throw new Error(res.message);
      }
      return response.json();
    })
    .then((result) => {
      store.dispatch(setForumTheme(result));
    })
    .catch((err) => {
      console.log(err);
    });
};
