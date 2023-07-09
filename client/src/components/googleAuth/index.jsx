import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import logo from 'assets/Vector-7.png';
import { useNavigate } from 'react-router-dom';
import { verifyingGoogleResponse } from 'http/verifyingGoogleResponse';

const GoogleAuth = ({ currentPage }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <div className="authPannel-header-google">
        <img src={logo} alt="google-logo" />{' '}
        {currentPage === 'authorization' ? 'Вход через аккаунт Google' : 'Регистрация с помощью аккаунта Google'}
        <div className="authPannel-header-google-button">
          <GoogleLogin
            onSuccess={(tokenResponse) => {
              const page = currentPage === 'authorization' ? '' : 'personal_info/data';
              verifyingGoogleResponse(tokenResponse, dispatch, navigate, page);
            }}
            onError={() => {
              console.log('Login Failed');
            }}
          />
        </div>
      </div>
    </>
  );
};

export default GoogleAuth;
