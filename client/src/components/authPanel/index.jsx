import React, { useEffect } from 'react';
import './index.scss';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import AuthPannelHeader from 'components/authPannelHeader';
import { authInputs } from 'constants/inputs';
import FormInput from 'components/common/formInput';
import { verifyingUserData } from 'http/verifyingUserData';
import { GoogleOAuthProvider } from '@react-oauth/google';

export default function AuthPanel() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
  const currentPage = location.pathname.slice(1);
  const renderInputs = authInputs.filter((e) => e.pages.includes(currentPage));

  const onSubmit = (data, e) => {
    e.preventDefault();
    console.log(data);
    verifyingUserData(data, currentPage, dispatch, reset, setError, navigate);
  };
  console.log(errors);
  useEffect(() => {
    reset();
  }, [reset]);

  return (
    <div className="authPannel">
      <GoogleOAuthProvider clientId="235213662998-9eqe351jifk2urdcj1q6k38hfru1bcme.apps.googleusercontent.com">
        <AuthPannelHeader reset={reset} errors={headerError} />
      </GoogleOAuthProvider>
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
      {currentPage === 'authorization' && (
        <NavLink className="authPannel__redirect" to="/recovery">
          Забыли пароль?
        </NavLink>
      )}
      {currentPage === 'recovery' && (
        <NavLink className="authPannel__redirect" to="/authorization">
          Назад
        </NavLink>
      )}
    </div>
  );
}
