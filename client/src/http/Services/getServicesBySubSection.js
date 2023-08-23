import { url } from 'constants/url';
import { refreshToken } from 'http/refreshToken';

export const getServicesBySubSection = (category, type, setRenderData) => {
  const token = localStorage.getItem('token') || '';
  fetch(`${url}/Jobs/FindBySubsectionName`, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain',
      'Content-Type': 'application/json;charset=UTF-8',
      'ngrok-skip-browser-warning': '1',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      subsectionName: type,
      sectionName: category,
    }),
  })
    .then(async (response) => {
      if (!response.ok) {
        if (response.status === 401) {
          refreshToken(getServicesBySubSection, category, type, setRenderData);
        }
        const res = await response.json();
        throw new Error(res.message);
      }
      return response.json();
    })
    .then((result) => {
      setRenderData(result);
    })
    .catch((err) => {
      console.log(err);
    });
};
