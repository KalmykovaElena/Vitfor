import { url } from 'constants/url';
import { refreshToken } from 'http/refreshToken';
import { setEvents } from 'redux/reducers/eventReducer';
import store from 'redux/store';

export const getEventByDate = (date, subsectionName) => {
  console.log(date, subsectionName);
  const token = localStorage.getItem('token') || '';
  fetch(`${url}/Events/GetByDateInSubsection`, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain',
      'Content-Type': 'application/json;charset=UTF-8',
      'ngrok-skip-browser-warning': '1',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      date,
      subsectionName,
    }),
  })
    .then(async (response) => {
      if (!response.ok) {
        if (response.status === 401) {
          refreshToken(getEventByDate, date, subsectionName);
        }
        const res = await response.json();
        throw new Error(res.message);
      }
      return response.json();
    })
    .then((result) => {
      console.log(result);
      store.dispatch(setEvents(result));
    })
    .catch((err) => {
      console.log(err);
    });
};
