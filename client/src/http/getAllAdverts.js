import { url } from 'constants/url';

export const getAllAdverts = (type, name, data, setRenderData, sortItems) => {
  const token = localStorage.getItem('token') || '';
  fetch(`${url}/Advert/${type}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain',
      'Content-Type': 'application/json;charset=UTF-8',
      'ngrok-skip-browser-warning': '1',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      [name]: data,
    }),
  })
    .then(async (response) => {
      if (!response.ok) {
        const res = await response.json();
        throw new Error(res.message);
      }
      return response.json();
    })
    .then((result) => {
      setRenderData(sortItems(result));
    })
    .catch((err) => {
      console.log(err);
    });
};
