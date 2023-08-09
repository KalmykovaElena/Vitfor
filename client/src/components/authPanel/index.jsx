import React, { useEffect, useState } from 'react';
import './index.scss';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import AuthPannelHeader from 'components/authPannelHeader';
import { authInputs } from 'constants/inputs';
import FormInput from 'components/common/formInput';
import { verifyingUserData } from 'http/verifyingUserData';
import { GoogleOAuthProvider } from '@react-oauth/google';
import img from 'assets/CheckCircle.png';
import { setIsAuth } from 'redux/reducers/authReducer';

export default function AuthPanel() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [message, setMessage] = useState(false);
  const currentPage = location.pathname.slice(1);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    reset,
    watch,
    setError,
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });
  const headerError = errors.password?.message || false;
  const renderInputs = authInputs.filter((e) => e.pages.includes(currentPage));

  const onSubmit = (data, e) => {
    e.preventDefault();
    verifyingUserData(data, location, dispatch, reset, setError, navigate, setMessage);
  };

  useEffect(() => {
    reset();
  }, [currentPage, reset]);

  return (
    <div className="authPannel">
      {currentPage !== 'confirm' && (
        <GoogleOAuthProvider clientId="235213662998-9eqe351jifk2urdcj1q6k38hfru1bcme.apps.googleusercontent.com">
          <AuthPannelHeader reset={reset} errors={headerError} />
        </GoogleOAuthProvider>
      )}
      {(currentPage === 'recovery' || currentPage === 'confirm') && message ? (
        <div className="authPannel-form ">
          <img className="authPannel-form-img" src={img} alt="success" />
          <h2>Успех</h2>
          <div>{message}</div>
          {currentPage === 'confirm' && (
            <button
              type="button"
              className="form-button"
              onClick={() => {
                navigate('/');
                dispatch(setIsAuth(true));
              }}
            >
              ОК
            </button>
          )}
        </div>
      ) : (
        <form className="authPannel-form " onSubmit={handleSubmit(onSubmit)}>
          {renderInputs.map((e) => (
            <FormInput
              key={e.id}
              data={e}
              register={register}
              error={errors}
              watch={watch}
              isDirty={isDirty}
              isValid={isValid}
            />
          ))}
        </form>
      )}
      {currentPage === 'authorization' && (
        <NavLink className="authPannel__redirect redirect" to="/recovery">
          Забыли пароль?
        </NavLink>
      )}
      {currentPage === 'recovery' && (
        <NavLink className="authPannel__redirect redirect" to="/authorization">
          Назад
        </NavLink>
      )}
    </div>
  );
}
