/* eslint-disable no-alert */
import { url } from 'constants/url';
import { parseSearch } from 'utils/parseSearch';
import { setIsAuth, setUser } from '../redux/reducers/authReducer';
import { getUserProfile } from './getUserProfile';

export const verifyingUserData = (data, location, dispatch, reset, setError, navigate, setMessage) => {
  const goToPage = (page) => navigate(`/${page}`);
  const currentPage = location.pathname.slice(1);

  if (currentPage === 'registration') {
    fetch(`${url}/Auth/Register`, {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain',
        'Content-Type': 'application/json;charset=UTF-8',
        'ngrok-skip-browser-warning': '1',
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    })
      .then(async (response) => {
        if (!response.ok) {
          const res = await response.json();
          if (res.message.includes('already exists')) {
            setError('email', { type: '400', message: 'Такая почта уже зарегистрирована в системе!' });
          }
          throw new Error(res.message);
        }

        return response.json();
      })
      .then((result) => {
        goToPage('personal_info/data');
        dispatch(setIsAuth(true));
        dispatch(setUser(result));
        localStorage.setItem('token', result.token);
        localStorage.setItem('refreshToken', result.refreshToken);
        reset();
      })
      .catch((err) => {
        console.log(err);
      });
  } else if (currentPage === 'authorization' || currentPage === 'confirm') {
    fetch(`${url}/Auth/Login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain',
        'Content-Type': 'application/json;charset=UTF-8',
        'ngrok-skip-browser-warning': '1',
      },
      body: JSON.stringify({
        login: data.email,
        password: data.password,
      }),
    })
      .then(async (response) => {
        if (!response.ok) {
          setError('email', { type: '400', message: 'Неверный адрес электронной почты или пароль' });
          const text = await response.json();
          throw new Error(text.message);
        }
        return response.json();
      })
      .then((result) => {
        localStorage.setItem('token', result.token);
        localStorage.setItem('refreshToken', result.refreshToken);
        getUserProfile(navigate, dispatch);
        dispatch(setUser(result));
        if (currentPage === 'confirm') {
          setMessage('Доступ успешно восстановлен');
        } else {
          goToPage('');
          dispatch(setIsAuth(true));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } else if (currentPage === 'recovery') {
    fetch(`${url}/Auth/ForgotPassword`, {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain',
        'Content-Type': 'application/json;charset=UTF-8',
        'ngrok-skip-browser-warning': '1',
      },
      body: JSON.stringify({
        userEmail: data.email,
      }),
    })
      .then(async (response) => {
        if (!response.ok) {
          setError('email', { type: '400', message: 'Неверный адрес электронной почты' });
          const text = await response.json();
          throw new Error(text.message);
        }
        return response.json();
      })
      .then((result) => {
        setMessage('Письмо отправлено на почту');
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  } else if (currentPage === 'Auth/ResetPassword') {
    const searchData = parseSearch(location.search);
    fetch(`${url}/Auth/ResetPassword?userEmail=${searchData.userEmail}&resetToken=${searchData.resetToken}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain',
        'Content-Type': 'application/json;charset=UTF-8',
        'ngrok-skip-browser-warning': '1',
        Host: `${url}`,
      },
      body: JSON.stringify({
        password: data.password,
      }),
    })
      .then(async (response) => {
        if (!response.ok) {
          const text = await response.json();
          if (text.message.includes('identical')) {
            setError('password', { type: '400', message: 'Пароль должен отличаться от предыдущего' });
          }
          throw new Error(text.message);
        }
        return response.json();
      })
      .then((result) => {
        goToPage('confirm');
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
