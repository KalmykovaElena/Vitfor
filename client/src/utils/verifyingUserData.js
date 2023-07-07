/* eslint-disable no-alert */
import { setIsAuth, setUser } from '../redux/reducers/authReducer';
// import { checkUserExist } from './checkUserExist';

const url = process.env.REACT_APP_BASEURL;
export const verifyingUserData = (data, currentPage, dispatch, reset, setError, navigate) => {
  const goToPage = (page) => navigate(`/${page}`);
  console.log(url);
  // const existUser = checkUserExist(data);
  console.log(data);
  if (currentPage === 'registration') {
    fetch(`/Auth/Register`, {
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
        // token
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
        console.log(result);
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
