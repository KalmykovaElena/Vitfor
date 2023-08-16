import React from 'react';
import styles from './index.module.scss';
import { ReactComponent as ChatIcon } from '../../assets/chatbox-ellipses.svg';

export const EmptyMessage = () => (
  <div className={styles.wrapper}>
    <div className={styles.title}>
      <ChatIcon /> Напишите что-нибудь
    </div>
    <div className={styles.text}>Начните Ваше общение</div>
  </div>
);
