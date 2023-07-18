import React, { useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
import './index.scss';
import Form from 'components/common/form';
import { safetyPageData } from 'constants/safetyData';
import img from 'assets/CheckCircle.png';
import { changePhoneNumber } from 'http/changePhoneNumber';
import { useDispatch } from 'react-redux';

const SafetySending = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const currentPage = location.pathname.split('/').slice(-1)[0];
  const renderData = safetyPageData[currentPage];

  const onSubmit = (data) => {
    if (currentPage === 'password') {
      navigate('/personal_info/safety/resetpassword');
    }
    if (currentPage === 'resetpassword') {
      setSuccess(true);
    }
    if (currentPage === 'phone') {
      // navigate('/personal_info/safety/phone/confirm');
      changePhoneNumber(data, navigate, dispatch, setSuccess);
    }

    if (currentPage === 'confirm') {
      setSuccess(true);
    }
  };

  return (
    <section className="safety-sending">
      {(success && currentPage === 'resetpassword') || (success && currentPage === 'phone') ? (
        <div className="safety-success ">
          <img className="safety-success-img" src={img} alt="success" />
          <h2>Успех</h2>
          <div>{currentPage === 'resetpassword' ? 'Пароль успешно изменен' : 'Номер успешно изменен'} </div>
          <button type="button" className="safety-success-link" onClick={() => navigate('/personal_info/safety')}>
            В начало
          </button>
        </div>
      ) : (
        <>
          <img src={renderData.icon} alt="mail icon" className="safety-sending-icon" />
          <div className="safety-title">
            <div className="main-title">{renderData.title}</div>
            <div className="title">{renderData.title2}</div>
            {error.message?.length > 50 && <div className="formInput-label__error">{error.message}</div>}
          </div>
          <Form
            name="safety"
            handlerSubmit={onSubmit}
            setError={setError}
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
          <div className="safety-sending-recover" onClick={() => navigate(-1)}>
            Назад
          </div>
        </>
      )}
    </section>
  );
};

export default SafetySending;
