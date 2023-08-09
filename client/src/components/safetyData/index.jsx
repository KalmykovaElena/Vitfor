import React from 'react';
import { NavLink } from 'react-router-dom';
import './index.scss';
import { useSelector } from 'react-redux';

const SafetyData = () => {
  const email = useSelector((state) => state.auth.user.userEmail);
  return (
    <section className="safety">
      <div className="safety-item">
        Почта
        <div className="safety-item-content">{email}</div>
      </div>
      <div className="safety-item">
        Пароль
        <div className="safety-item-content">
          <NavLink to="password"> Сменить пароль</NavLink>
        </div>
      </div>
    </section>
  );
};

export default SafetyData;
