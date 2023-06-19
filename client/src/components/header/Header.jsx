import React from 'react';
import { NavLink } from 'react-router-dom';
import './header.scss';
import logo from '../../assets/logo.png';

export default function Header() {
  return (
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
      <button className="header-button" type="button">
        Вход
      </button>
    </header>
  );
}
