import React, { useRef, useState } from 'react';
import exitPng from 'assets/exit.png';
import profilePng from 'assets/profile.png';
import settingsPng from 'assets/settings.png';
import { Menu, Switch } from 'antd';
import './index.scss';
import Icon from '@ant-design/icons/lib/components/Icon';
import { useOnClickOutside } from 'hooks/useOnClickOutside';
import SubMenu from 'antd/es/menu/SubMenu';
import { useDispatch } from 'react-redux';
import { setIsAuth } from 'redux/reducers/authReducer';
import { Link } from 'react-router-dom';

const exit = () => <img src={exitPng} alt="exit" />;
const profile = () => <img src={profilePng} alt="profile" />;
const settings = () => <img src={settingsPng} alt="profile" />;
// function getItem(label, key, icon, children, type) {
//   return {
//     key,
//     icon,
//     children,
//     label,
//     type,
//   };
// }

// const items = [
//   getItem('Мой профиль', 'profile', <Icon component={profile} />),
//   getItem('Настройки профиля', 'settings', <Icon component={settings} />),
//   getItem('Выход', 'sub1', <Icon component={exit} />, [
//     getItem('Вы уверены, что хотите выйти?', 'g1', null, [getItem('Да', 'exit'), getItem('Нет', 'return')], 'group'),
//   ]),
// ];
const ModalMenu = ({ setIsMenuOpen }) => {
  const [theme, setTheme] = useState('dark');
  const dispatch = useDispatch();
  const ref = useRef();
  useOnClickOutside(ref, () => setIsMenuOpen(false));

  const changeTheme = (value) => {
    console.log(value);
    setTheme(value ? 'light' : 'dark');
  };
  const onClick = () => {
    dispatch(setIsAuth(false));
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  };
  return (
    <div ref={ref} className={theme === 'dark' ? 'modal-menu modal-menu_dark' : 'modal-menu modal-menu_light'}>
      <Switch
        onChange={changeTheme}
        checkedChildren="день"
        unCheckedChildren="ночь"
        style={{ backgroundColor: theme === 'dark' ? '#6b2e5a' : 'orange' }}
      />
      <Menu
        // onClick={onClick}
        style={{
          width: 317,
        }}
        mode="inline"
        // items={items}
        theme={theme}
      >
        <Menu.Item key="setting:3" icon={<Icon component={profile} />}>
          Мой профиль
        </Menu.Item>
        <Menu.Item key="setting:4" icon={<Icon component={settings} />}>
          Настройки профиля
          <Link to="personal_info/data"></Link>
        </Menu.Item>
        <SubMenu key="SubMenu" icon={<Icon component={exit} />} title="Выход">
          <Menu.ItemGroup title="Вы уверены, что хотите выйти?">
            <Menu.Item key="setting:1" onClick={onClick}>
              Да
            </Menu.Item>
            <Menu.Item key="setting:2">Нет</Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
      </Menu>
    </div>
  );
};
export default ModalMenu;
