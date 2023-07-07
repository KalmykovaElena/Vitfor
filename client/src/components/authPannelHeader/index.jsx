import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import logo from 'assets/Vector-7.png';
import './index.scss';

const AuthPannelHeader = ({ errors }) => {
  const location = useLocation();
  const currentPage = location.pathname.slice(1);

  return (
    <div className="authPannel-header">
      {currentPage === 'recovery' || currentPage === 'Auth/ResetPassword' ? (
        <div>Восстановление пароля</div>
      ) : (
        <>
          <div className="authPannel-header__controls">
            <NavLink className="controls-button" to="/authorization">
              Вход
            </NavLink>
            <NavLink className="controls-button" to="/registration">
              Регистрация
            </NavLink>
          </div>
          {errors.length > 50 ? (
            <div className="authPannel-header__error">{errors}</div>
          ) : (
            <div>
              <img src={logo} alt="google-logo" />{' '}
              {currentPage === 'authorization' ? 'Вход через аккаунт Google' : 'Регистрация с помощью аккаунта Google'}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AuthPannelHeader;
