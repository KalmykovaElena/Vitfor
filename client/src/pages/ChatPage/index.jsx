import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import styles from './index.module.scss';
import { ChatWindow } from '../../components/ChatWindow';
import { ChatsList } from '../../components/ChatsList';
import Header from '../../components/header';
import { EmptyChat } from '../../components/EmptyChat';

export const ChatPage = () => {
  const [isSelect, setIsSelect] = useState(false);
  const [selectedUser, setSelectedUser] = useState();
  const theme = useSelector((state) => state.auth.theme);
  return (
    <div className={classNames(styles.wrapper, { [styles.light]: theme === 'light' })}>
      <Header />
      <div className={styles.content}>
        <ChatsList
          isSelect={isSelect}
          selectedUser={selectedUser}
          handleSelect={(userName) => {
            setIsSelect(true);
            setSelectedUser(userName);
          }}
        />
        {isSelect ? <ChatWindow /> : <EmptyChat />}
      </div>
    </div>
  );
};
