import React from 'react';
import styles from './index.module.scss';
import Logo from 'components/logo';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Favourites } from 'components/sale-components/Favourites';

const ForumItem = ({ item }) => {
  const theme = useSelector((state) => state.auth.theme);
  const navigate = useNavigate();
  const { userName, nickName, userPhoto, title, messagesCount, dateOfLastMessage, topicId, isFavourite } = item;
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
      <Favourites
        size="short"
        id={topicId}
        checked={isFavourite}
        adCategory="forum"
        className={styles.theme_favourite}
        item={item}
      />
    </div>
  );
};
export default ForumItem;
