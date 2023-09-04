import React from 'react';
import styles from './index.module.scss';
import Logo from 'components/logo';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ForumItem = ({ userName, nickName, userPhoto, title, messagesCount, dateOfLastMessage, topicId }) => {
  const theme = useSelector((state) => state.auth.theme);
  const navigate = useNavigate();
  const itemDate =
    dateOfLastMessage === '0001-01-01T00:00:00'
      ? ''
      : new Date(dateOfLastMessage).toLocaleString('ru-RU', {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
        });
  return (
    <div
      className={classNames(styles.wrapper, { [styles.wrapper_light]: theme === 'light' })}
      onClick={() => navigate(`theme/${topicId}`)}
    >
      <Logo name="user" text={userName} subtext={nickName} img={userPhoto} textLocation="right" />
      <div className={styles.title}>{title}</div>
      <div className={styles.countMessages}>{messagesCount} сообщений</div>
      <div className={styles.date}>{itemDate}</div>
    </div>
  );
};
export default ForumItem;
