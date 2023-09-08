import { url } from 'constants/url';
import { refreshToken } from './refreshToken';

export const getAllAdverts = (type, name, data, setRenderData, category) => {
  const token = localStorage.getItem('token') || '';
  const sendData = {
    [name]: data,
  };
  if (category) sendData.sectionName = category;
  fetch(`${url}/Adverts/${type}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain',
      'Content-Type': 'application/json;charset=UTF-8',
      'ngrok-skip-browser-warning': '1',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(sendData),
  })
    .then(async (response) => {
      if (!response.ok) {
        if (response.status === 401) {
          refreshToken(getAllAdverts, type, name, data, setRenderData, category);
        }
        const res = await response.json();
        throw new Error(res.message);
      }
      return response.json();
    })
    .then((result) => {
      console.log(result);
      setRenderData(result);
    })
    .catch((err) => {
      console.log(err);
    });
};
