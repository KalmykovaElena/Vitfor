import { url } from '../../constants/url';
import { refreshToken } from '../refreshToken';

export const deleteFind = async (findId) => {
  const token = localStorage.getItem('token');
  return (
    fetch(`${url}/Finds/DeleteFind`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json, text/plain',
        'Content-Type': 'application/json;charset=UTF-8',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ findId }),
    })
      // eslint-disable-next-line consistent-return
      .catch((error) => {
        if (error.status === 401) {
          refreshToken(deleteFind, findId);
        } else {
          return error.statusText;
        }
      })
  );
};
