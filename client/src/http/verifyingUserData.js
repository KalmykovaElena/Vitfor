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
          console.log(res);
          if (res.message.includes('already exists')) {
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
        setMessage(true);
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  } else if (currentPage === 'Auth/ResetPassword') {
    const searchData = parseSearch(location.search);
    console.log(searchData);
    fetch(`${url}/Auth/ResetPassword?userEmail=${searchData.userEmail}&resetToken=${searchData.resetToken}`, {
      method: 'POST',
      // mode: 'cors',
      headers: {
        Accept: 'application/json, text/plain',
        'Content-Type': 'application/json;charset=UTF-8',
        'ngrok-skip-browser-warning': '1',
        Host: 'https://e1b7-37-215-47-243.ngrok-free.app',
      },
      body: JSON.stringify({
        password: data.password,
      }),
    })
      .then(async (response) => {
        if (!response.ok) {
          const text = await response.json();
          throw new Error(text.message);
        }
        return response.json();
      })
      .then((result) => {
        goToPage('authorization');
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
