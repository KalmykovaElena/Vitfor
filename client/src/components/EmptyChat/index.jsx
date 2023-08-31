import React from 'react';
import styles from './index.module.scss';
import { ReactComponent as MailIcon } from '../../assets/mail-icon.svg';

export const EmptyChat = () => (
  <div className={styles.wrapper}>
    <div className={styles.content}>
      <div className={styles.title}>
        <MailIcon /> Выберете чат для общения
      </div>
      <div className={styles.text}>В списке слева все Ваши активные чаты</div>
    </div>
  </div>
);
