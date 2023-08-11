import React from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import styles from './index.module.scss';
import { UserIcon } from '../UserIcon';

export const ChatHeader = ({ img, userName, userNickName }) => {
  const theme = useSelector((state) => state.auth.theme);
  return (
    <div className={styles.wrapper}>
      <UserIcon className={styles.img} img={img} userName={userName} />
      <div className={styles.names}>
        <span className={classNames(styles.userName, { [styles.lightUserNameTheme]: theme === 'light' })}>
          {userName}
        </span>
        <span className={classNames(styles.userNickname, { [styles.lightUserNickname]: theme === 'light' })}>
          {userNickName}
        </span>
      </div>
      {/* TODO 3 точки с dropdownmenu */}
    </div>
  );
};
