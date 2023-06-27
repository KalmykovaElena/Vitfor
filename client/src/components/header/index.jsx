import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './index.scss';
import logo from 'assets/logo.png';
import Button from 'components/common/button';

const Header = () => (
  <header className="header">
    <h3 className="header-logo">
      <img src={logo} alt="logo" /> ВИТФОР
    </h3>
    <nav className="header-nav">
      <NavLink to="/"> Главная</NavLink>
      <NavLink to="/news"> Новости</NavLink>
      <NavLink to="/weather"> Погода</NavLink>
      <NavLink to="/categories"> Категории</NavLink>
      <NavLink to="/questions"> Вопрос-ответ</NavLink>
      <NavLink to="/aboutus"> О нас</NavLink>
    </nav>
    <Link to="/authorization">
      <Button name="Вход" />
    </Link>
  </header>
);

export default Header;
