import { url } from 'constants/url';
import { refreshToken } from 'http/refreshToken';
import { setAdverts } from 'redux/reducers/advertReducer';
import store from 'redux/store';

export const getServicesBySection = (category) => {
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
          refreshToken(getServicesBySection, category);
        }
        const res = await response.json();
        throw new Error(res.message);
      }
      return response.json();
    })
    .then(async (result) => {
      const res = await result;
      store.dispatch(setAdverts(res));
    })
    .catch((err) => {
      console.log(err);
    });
};
