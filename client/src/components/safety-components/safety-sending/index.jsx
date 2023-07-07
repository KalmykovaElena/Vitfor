import React from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
import './index.scss';
import Form from 'components/common/form';
import { safetyPageData } from 'constants/safetyData';

const SafetySending = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPage = location.pathname.split('/').slice(-1)[0];
  const renderData = safetyPageData[currentPage];

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <section className="safety-sending">
      <img src={renderData.icon} alt="mail icon" className="safety-sending-icon" />
      <div className="safety-title">
        <div className="main-title">{renderData.title}</div>
        <div className="title">{renderData.title2}</div>
      </div>
      <Form
        name="safety"
        handlerSubmit={onSubmit}
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
    </section>
  );
};

export default SafetySending;
