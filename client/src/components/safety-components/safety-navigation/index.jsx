import React from 'react';
import { Link } from 'react-router-dom';
import arrow from 'assets/CaretDown.svg';
import './index.scss';
import FormInput from 'components/common/formInput';
import { useSelector } from 'react-redux';

const SafetyNavigation = () => {
  const email = useSelector((state) => state.auth.user.email);
  return (
    <section className="safety">
      <div className="safety-header">Безопасность и вход</div>
      <div className="safety-wrapper">
        <div className="safety-item">
          Почта
          <div className="safety-item-content">{email}</div>
        </div>
        <div className="safety-item">
          Пароль
          <div className="safety-item-content">
            Сменить пароль
            <Link className="safety-item-link" to="password">
              <img src={arrow} alt="перейти к редактированию пароля" />
            </Link>
          </div>
        </div>
        <div className="safety-item">
          Телефон/Никнейм
          <div className="safety-item-content">
            Привязать номер телефона или никнейм Вашего Telegram
            <Link className="safety-item-link" to="phone">
              <img src={arrow} alt="пПривязать номер телефона или никнейм Вашего Telegram" />
            </Link>
          </div>
        </div>
      </div>
      <FormInput data={{ inputType: 'submit', id: 'input-submit' }} defaultValue="Выйти из всех устройств" />
    </section>
  );
};

export default SafetyNavigation;
