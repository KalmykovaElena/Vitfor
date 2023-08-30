/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import styles from './index.module.scss';
import { ChatWindow } from '../../components/ChatWindow';
import { ChatsList } from '../../components/ChatsList';

import { EmptyChat } from '../../components/EmptyChat';
import { chatAction } from 'redux/reducers/chatReducer';

export const ChatPage = () => {
  const [isSelect, setIsSelect] = useState(false);
  const [selectedUser, setSelectedUser] = useState();
  const theme = useSelector((state) => state.auth.theme);
  const dispatch = useDispatch();
  useEffect(() => () => dispatch(chatAction.getActualChat({})), []);
  return (
    <div className={classNames(styles.wrapper, { [styles.light]: theme === 'light' })}>
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
