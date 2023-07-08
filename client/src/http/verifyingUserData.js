/* eslint-disable no-alert */
import { url } from 'constants/url';
import { setIsAuth, setUser } from '../redux/reducers/authReducer';
import { getUserProfile } from './getUserProfile';

export const verifyingUserData = (data, currentPage, dispatch, reset, setError, navigate) => {
  const goToPage = (page) => navigate(`/${page}`);
  console.log(url);

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
          console.log(res);
          if (res.message.includes('is already taken')) {
            setError('email', { type: '400', message: 'Такая почта уже зарегистрирована в системе!' });
          }
          throw new Error(res.message);
        }

        return response.json();
      })
      .then((result) => {
        console.log(result);
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
  } else if (currentPage === 'authorization') {
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
          console.log(response);
          setError('email', { type: '400', message: 'Неверный адрес электронной почты или пароль' });
          const text = await response.json();
          console.log(text);
          throw new Error(text.message);
        }
        return response.json();
      })
      .then((result) => {
        getUserProfile(result.token, navigate, dispatch);
        goToPage('');
        dispatch(setIsAuth(true));
        dispatch(setUser(result));
        localStorage.setItem('token', result.token);
        localStorage.setItem('refreshToken', result.refreshToken);
      })
      .catch((err) => {
        console.log(err);
      });
    // восстановление сделать
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
          console.log(response);
          setError('email', { type: '400', message: 'Неверный адрес электронной почты или пароль' });
          const text = await response.json();
          console.log(text);
          throw new Error(text.message);
        }
        return response.json();
      })
      .then((result) => {
        /// выводим сообщение пройти по ссылке на почте
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
