import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './index.scss';
import Form from 'components/common/form';
import img from 'assets/CheckCircle.png';
import { resetPasswordData } from 'constants/resetPasswordData';
import { resetPassword } from 'http/resetPassword';
import { useDispatch } from 'react-redux';

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [passwordError, setPasswordError] = useState('');
  const [success, setSuccess] = useState(false);
  const currentPage = location.pathname.split('/').slice(-1)[0];
  const renderData = resetPasswordData[currentPage];

  const onSubmit = (data, setError, reset) => {
    resetPassword(currentPage, data, navigate, dispatch, setSuccess, setError, reset);
  };
  return (
    <section className="password">
      {success && currentPage === 'resetpassword' ? (
        <div className="password-success ">
          <img className="password-success-img" src={img} alt="success" />
          <h2>Успех</h2>
          <div> Пароль успешно изменен</div>
          <button type="button" className="password-success-link" onClick={() => navigate('/personal_info/data')}>
            В начало
          </button>
        </div>
      ) : (
        <>
          <img src={renderData.icon} alt="mail icon" className="password-sending-icon" />
          <div className="password-title">
            <div className="main-title">{renderData.title}</div>
            <div className="title">{renderData.title2}</div>
            {passwordError.message?.length > 70 && (
              <div className="formInput-label__error">{passwordError.message}</div>
            )}
          </div>
          <Form
            name="safety"
            handlerSubmit={onSubmit}
            setPasswordError={setPasswordError}
            leterReset="true"
            nameSubmit="Подтвердить"
            {...renderData.attrs}
            input={{
              inputLabel: renderData.label,
              id: `input-${currentPage}`,
              inputType: renderData.type,
              placeholder: renderData.placeholder,
              inputName: currentPage,
              validateInput: renderData.validateInput,
            }}
          />
          <div className="password-sending-recover" onClick={() => navigate(-1)}>
            Назад
          </div>
        </>
      )}
    </section>
  );
};

export default ResetPassword;
