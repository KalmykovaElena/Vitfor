import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './index.scss';
import logo from 'assets/logo.png';
import Button from 'components/common/button';
import Logo from 'components/logo';
import { useSelector } from 'react-redux';
import ModalMenu from 'components/modal-menu';

const Header = () => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const userImg = useSelector((state) => state.auth.user.photo);
  const userName = useSelector((state) => state.auth.user.userName);
  const nickName = useSelector((state) => state.auth.user.nickName);
  const theme = useSelector((state) => state.auth.theme);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const color = userImg?.includes('data:image') ? '' : userImg;

  const togleOpenMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={`header header_${theme}`}>
      <Logo name="app" img={logo} text="VitFor" textLocation="right" />
      <nav className="header-nav">
        <NavLink to="/"> Главная</NavLink>
        <NavLink to="/news"> Новости</NavLink>
        <NavLink to="/weather"> Погода</NavLink>
        <NavLink to="/categories"> Категории</NavLink>
        <NavLink to="/questions"> Вопрос-ответ</NavLink>
        <NavLink to="/aboutus"> О нас</NavLink>
      </nav>
      {isAuth ? (
        <>
          <Logo
            name="userlogo"
            img={userImg}
            color={color}
            text={userName}
            subtext={nickName}
            handler={togleOpenMenu}
          />
          {isMenuOpen && <ModalMenu setIsMenuOpen={setIsMenuOpen} />}
        </>
      ) : (
        <Link to="/authorization">
          <Button name="Вход" />
        </Link>
      )}
    </header>
  );
};

export default Header;
