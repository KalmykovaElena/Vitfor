import React from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import styles from './index.module.scss';
import { UserIcon } from '../UserIcon';

export const ChatHeader = () => {
  const { theme, selectedUser } = useSelector((state) => ({
    theme: state.auth.theme,
    selectedUser: state.chat.selectedUser,
  }));
  return (
    <div className={styles.wrapper}>
      <UserIcon className={styles.img} img={selectedUser.img} userName={selectedUser.userName} />
      <div className={styles.names}>
        <span className={classNames(styles.userName, { [styles.lightUserNameTheme]: theme === 'light' })}>
          {selectedUser.username}
        </span>
        <span className={classNames(styles.userNickname, { [styles.lightUserNickname]: theme === 'light' })}>
          {selectedUser.nickName}
        </span>
      </div>
      {/* TODO 3 точки с dropdownmenu */}
    </div>
  );
};
