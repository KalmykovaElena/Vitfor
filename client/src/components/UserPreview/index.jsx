import React from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import styles from './index.module.scss';
import { UserIcon } from '../UserIcon';

export const UserPreview = (props) => {
  const { userName, UserNickname, img, isChoosing, onClick } = props;
  const theme = useSelector((state) => state.auth.theme);
  // TODO click logic
  return (
    <div onClick={onClick} className={classNames(styles.wrapper, { [styles.isChoosing]: isChoosing })}>
      <UserIcon img={img} userName={userName} />
      <div className={styles.names}>
        <span className={classNames(styles.userName, { [styles.lightUserNameTheme]: theme === 'light' })}>
          {userName}
        </span>
        <span className={classNames(styles.userNickname, { [styles.lightUserNickname]: theme === 'light' })}>
          {UserNickname}
        </span>
      </div>
    </div>
  );
};
