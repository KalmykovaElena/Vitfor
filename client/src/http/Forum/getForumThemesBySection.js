import { url } from 'constants/url';
import { refreshToken } from 'http/refreshToken';

export const getForumThemesBySection = (category, setRenderData) => {
  const token = localStorage.getItem('token') || '';
  console.log({
    subsectionName: category,
    sectionName: 'Forum',
  });
  fetch(`${url}/Topics/FindBySubsectionName`, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain',
      'Content-Type': 'application/json;charset=UTF-8',
      'ngrok-skip-browser-warning': '1',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      subsectionName: category,
      sectionName: 'Forum',
    }),
  })
    .then(async (response) => {
      if (!response.ok) {
        if (response.status === 401) {
          refreshToken(getForumThemesBySection, category, setRenderData);
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
