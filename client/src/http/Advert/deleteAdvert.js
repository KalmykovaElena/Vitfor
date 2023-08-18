import { url } from '../../constants/url';
import { refreshToken } from '../refreshToken';

export const deleteAdvert = async (advertId) => {
  const token = localStorage.getItem('token');
  return (
    fetch(`${url}/Adverts/DeleteAdvert`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json, text/plain',
        'Content-Type': 'application/json;charset=UTF-8',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ advertId }),
    })
      // eslint-disable-next-line consistent-return
      .catch((error) => {
        if (error.status === 401) {
          refreshToken(deleteAdvert, advertId);
        } else {
          return error.statusText;
        }
      })
  );
};
