import React from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import styles from './index.module.scss';

export const ChatMessage = ({ text, senderId }) => {
  const { user, theme } = useSelector((state) => ({
    user: state.auth.user,
    theme: state.auth.theme,
  }));
  return (
    <div
      className={classNames(styles.wrapper, {
        [styles.myMessage]: user.userId === senderId,
      })}
    >
      <div
        className={classNames(styles.message, {
          [styles.companion]: user.userId !== senderId,
          [styles.light]: theme === 'light',
          [styles.lightCompanion]: theme === 'light' && user.userId !== senderId,
        })}
      >
        {text}
      </div>
    </div>
  );
};
