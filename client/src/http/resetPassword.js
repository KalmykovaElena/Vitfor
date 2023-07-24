import { url } from 'constants/url';
import { refreshToken } from './refreshToken';

export const resetPassword = (currentPage, data, navigate, dispatch, setSuccess, setError, reset) => {
  const token = localStorage.getItem('token');
  if (currentPage === 'password') {
    fetch(`${url}/Account/CheckPassword`, {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain',
        'Content-Type': 'application/json;charset=UTF-8',
        Authorization: `Bearer ${token}`,
        Host: `${url}`,
      },
      body: JSON.stringify({
        oldPassword: data.password,
      }),
    })
      .then(async (response) => {
        if (!response.ok) {
          if (response.status === 401) {
            refreshToken(token, navigate, resetPassword, dispatch, data);
          }
          const res = await response.json();
          setError('password', { type: '400', message: 'Неверный пароль' });
          throw new Error(res.message);
        }
        return response.json();
      })
      .then((result) => {
        console.log(result);
        navigate('/personal_info/data/resetpassword');
        reset();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  if (currentPage === 'resetpassword') {
    fetch(`${url}/Account/ChangePassword`, {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain',
        'Content-Type': 'application/json;charset=UTF-8',
        Authorization: `Bearer ${token}`,
        Host: `${url}`,
      },
      body: JSON.stringify({
        newPassword: data.resetpassword,
      }),
    })
      .then(async (response) => {
        if (!response.ok) {
          if (response.status === 401) {
            refreshToken(token, navigate, resetPassword, dispatch, data);
          }
          const res = await response.json();
          if (res.message.includes('Passwords are identical')) {
            setError('resetpassword', { type: '400', message: 'Пароль должен отличаться от предыдущего' });
          }
          throw new Error(res.message);
        }
        return response.json();
      })
      .then((result) => {
        console.log(result);
        setSuccess(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
