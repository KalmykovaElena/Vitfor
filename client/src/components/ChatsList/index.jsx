import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './index.module.scss';
import { UserPreview } from '../UserPreview';
import { getChatMessages } from '../../http/Chat/getChatMessages';
import { getChats } from '../../http/Chat/getChats';
import { chatAction } from '../../redux/reducers/chatReducer';

export const ChatsList = ({ isSelect, selectedUser, handleSelect }) => {
  const { chats, actualChat } = useSelector((state) => ({
    chats: state.chat.chats,
    actualChat: state.chat.actualChat,
  }));

  const [chatList, setChatList] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    if (actualChat) {
      if (actualChat.chatId === null) {
        setChatList([...chatList, actualChat]);
      }
    }
    dispatch(getChats());
  }, [actualChat]);
  useEffect(() => {
    if (!chatList.length) {
      setChatList(chats);
    }
  }, [chats]);
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>Сообщения</div>
      {chatList.length && (
        <div className={styles.chats}>
          {chatList.map(({ photo, username, nickName, chatId }) => (
            <UserPreview
              img={photo}
              userName={username}
              nickname={nickName}
              isChoosing={isSelect && selectedUser === username}
              handleClick={() => {
                handleSelect(username);
                dispatch(chatAction.getMessages([]));
                if (chatId) {
                  dispatch(getChatMessages(chatId));
                }
                dispatch(chatAction.getSelectedUser({ username, nickName, img: photo }));
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};
