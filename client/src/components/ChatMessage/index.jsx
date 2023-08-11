import React from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import styles from './index.module.scss';

export const ChatMessage = (props) => {
  const { text, messageHandler } = props;
  const { userName } = useSelector((state) => state.auth.profileData);
  return (
    <div className={classNames(styles.wrapper, { [styles.myMessage]: userName === messageHandler })}>
      <div className={classNames(styles.message, { [styles.companion]: userName !== messageHandler })}>{text}</div>
    </div>
  );
};
