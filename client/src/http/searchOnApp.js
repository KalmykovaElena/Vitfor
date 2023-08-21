import { url } from 'constants/url';
import { setSearchItems } from 'redux/reducers/searchReducer';
import store from 'redux/store';

export const searchOnApp = (value) => {
  const token = localStorage.getItem('token') || '';
  fetch(`${url}/SearchByKeyPhrase?phrase=${value}`, {
    headers: {
      Accept: 'application/json, text/plain',
      'Content-Type': 'application/json;charset=UTF-8',
      'ngrok-skip-browser-warning': '1',
      Host: `${url}`,
      Authorization: `Bearer ${token}`,
    },
  })
    .then(async (response) => {
      if (!response.ok) {
        const text = await response.json();
        throw new Error(text.message);
      }
      return response.json();
    })
    .then((result) => {
      store.dispatch(setSearchItems(result));
    })
    .catch((err) => {
      console.log(err);
    });
};
