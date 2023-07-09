import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import './index.scss';
import GoogleAuth from 'components/googleAuth';

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
            <GoogleAuth currentPage={currentPage} />
          )}
        </>
      )}
    </div>
  );
};

export default AuthPannelHeader;
