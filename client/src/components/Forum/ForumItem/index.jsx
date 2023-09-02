import React from 'react';
import styles from './index.module.scss';
import Logo from 'components/logo';
import classNames from 'classnames';
import { useSelector } from 'react-redux';

const ForumItem = ({ userName, nickname, img, title, countMessages, dateOfCreation }) => {
  const theme = useSelector((state) => state.auth.theme);
  const itemDate = new Date(dateOfCreation).toLocaleString('ru-RU', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
  return (
    <div className={classNames(styles.wrapper, { [styles.wrapper_light]: theme === 'light' })}>
      {/* Logo = ({ name, img, color, text, subtext, textLocation, handler, isTextActive }) */}
      <Logo name="user" text={userName} subtext={nickname} img={img} textLocation="right" />
      <div className={styles.title}>{title}</div>
      <div className={styles.countMessages}>{countMessages} сообщений</div>
      <div className={styles.date}>{itemDate}</div>
    </div>
  );
};
export default ForumItem;
