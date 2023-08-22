import { url } from 'constants/url';
import { refreshToken } from 'http/refreshToken';
import { setAdverts } from 'redux/reducers/advertReducer';
import store from 'redux/store';

export const getServices = (category) => {
  const token = localStorage.getItem('token') || '';
  fetch(`${url}/Jobs/FindBySectionName`, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain',
      'Content-Type': 'application/json;charset=UTF-8',
      'ngrok-skip-browser-warning': '1',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      sectionName: category,
    }),
  })
    .then(async (response) => {
      if (!response.ok) {
        if (response.status === 401) {
          refreshToken(getServices, category);
        }
        const res = await response.json();
        throw new Error(res.message);
      }
      return response.json();
    })
    .then((result) => {
      console.log(result);
      store.dispatch(setAdverts(result));
    })
    .catch((err) => {
      console.log(err);
    });
};
