import { url } from 'constants/url';
import { refreshToken } from './refreshToken';

export const setUserTheme = (theme, dispatch, navigate) => {
  console.log(theme);
  const token = localStorage.getItem('token');
  fetch(`${url}/Theme/ChangeTheme`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json, text/plain',
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(theme),
  })
    .then(async (response) => {
      if (!response.ok) {
        if (response.status === 401) {
          refreshToken(token, navigate, setUserTheme, dispatch, theme);
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
