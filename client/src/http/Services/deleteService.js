import { url } from '../../constants/url';
import { refreshToken } from '../refreshToken';

export const deleteService = async (jobId) => {
  const token = localStorage.getItem('token');
  return (
    fetch(`${url}/Jobs/DeleteJob`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json, text/plain',
        'Content-Type': 'application/json;charset=UTF-8',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ jobId }),
    })
      // eslint-disable-next-line consistent-return
      .catch((error) => {
        console.log(error);
        if (error.status === 401) {
          refreshToken(deleteService, jobId);
        } else {
          return error.statusText;
        }
      })
  );
};
