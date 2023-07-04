import React, { useEffect } from 'react';
import './index.scss';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import AuthPannelHeader from 'components/authPannelHeader';
import { authInputs } from 'constants/inputs';
import FormInput from 'components/common/formInput';
import { verifyingUserData } from 'utils/verifyingUserData';
import { setAuthErrors } from 'redux/reducers/authReducer';

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
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });
  const headerError = errors.password?.message || false;
  const currentPage = location.pathname.slice(1);
  const renderInputs = authInputs.filter((e) => e.pages.includes(currentPage));

  const onSubmit = (data) => {
    verifyingUserData(data, currentPage, dispatch, reset, navigate);
  };

  useEffect(() => {
    reset();
    dispatch(setAuthErrors({}));
  }, [dispatch, location, reset]);

  return (
    <div className="authPannel">
      <AuthPannelHeader reset={reset} errors={headerError} />
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
