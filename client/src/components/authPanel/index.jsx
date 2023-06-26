import React, { useEffect } from 'react';
import './index.scss';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { NavLink, useLocation } from 'react-router-dom';
import AuthPannelHeader from '../authPannelHeader';
import { authInputs } from '../../constants/inputs';
import FormInput from '../common/formInput';
import { verifyingUserData } from '../../utils/verifyingUserData';
import { setAuthErrors } from '../../redux/reducers/authReducer';

export default function AuthPanel() {
  const location = useLocation();
  const currentPage = location.pathname.slice(1);
  const dispatch = useDispatch();
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
  useEffect(() => {
    reset();
    dispatch(setAuthErrors({}));
  }, [dispatch, location, reset]);
  const onSubmit = (data) => {
    verifyingUserData(data, currentPage, dispatch, reset);
  };

  const renderInputs = authInputs.filter((e) => e.pages.includes(currentPage));
  return (
    <div className="authPannel">
      <AuthPannelHeader reset={reset} />
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
