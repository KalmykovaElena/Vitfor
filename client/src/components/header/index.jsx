import React, { useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import './index.scss';
import logo from 'assets/logo.png';
import Button from 'components/common/button';
import Logo from 'components/logo';
import { useSelector } from 'react-redux';
import ModalMenu from 'components/modal-menu';
import { news } from 'constants/url';
import { Menu } from 'antd';
import { categories } from 'constants/categories';
import Select from 'components/common/select';

const Header = () => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const userImg = useSelector((state) => state.auth.user.photo);
  const userName = useSelector((state) => state.auth.user.userName);
  const nickName = useSelector((state) => state.auth.user.nickName);
  const theme = useSelector((state) => state.auth.theme);
  const navigate = useNavigate();
  const location = useLocation();
  const [current, setCurrent] = useState(location.pathname);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  console.log(location);
  const onClick = (e) => {
    navigate(e.key);
    setCurrent(e.key);
    console.log(e.key);
  };
  console.log(current);
  const color = userImg?.includes('data:image') ? '' : userImg;

  const togleOpenMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={`header header_${theme}`}>
      <Logo
        name="app"
        img={logo}
        text="VitFor"
        textLocation="right"
        handler={() => navigate('/')}
        isTextActive="true"
      />
      <nav className="header-nav">
        <NavLink to="/"> Главная</NavLink>
        <NavLink to={news}> Новости</NavLink>
        <NavLink to="/weather"> Погода</NavLink>
        <div className="submenu">
          Категории
          <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={categories}
            triggerSubMenuAction="click"
            className="submenu-menu"
            theme="dark"
          />
        </div>
        <NavLink to="/questions"> Вопрос-ответ</NavLink>
        <NavLink to="/aboutus"> О нас</NavLink>
      </nav>
      <div className="header-controls">
        <Select data={['РУС', 'EN', 'BY']} onchangeSelect={(e) => console.log(e)} />
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
            <Button name="Вход" type="enter" />
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
