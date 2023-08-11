import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Caret } from 'assets/CaretDown.svg';
import './index.scss';
import { useSelector } from 'react-redux';

const SafetyData = () => {
  const email = useSelector((state) => state.auth.user.userEmail);
  const navigate = useNavigate();
  return (
    <section className="safety">
      <div className="safety-item">
        Почта
        <div className="safety-item-content">{email}</div>
      </div>
      <div className="safety-item">
        Пароль
        <div className="safety-item-content link" onClick={() => navigate('password')}>
          Сменить пароль
          <Caret className="caret" />
        </div>
      </div>
    </section>
  );
};

export default SafetyData;
