/* eslint-disable react-hooks/exhaustive-deps */
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
      const { username, nickName, userPhoto, advertId, advertTitle, advertPrice, advertPhoto } = actualChat;
      if (!chatList.find((item) => item.chatId === actualChat.chatId) && actualChat.chatId) {
        setChatList([...chatList, actualChat]);
        handleSelect(actualChat.username);
      }
      dispatch(chatAction.getSelectedUser({ username, nickName, img: userPhoto }));
      dispatch(chatAction.getAdvert({ advertId, advertTitle, advertPrice, advertPhoto }));
    }
    dispatch(getChats());
  }, [actualChat]);
  useEffect(() => {
    // if (!chatList.length) {
    setChatList(chats);
    // }
  }, [chats]);
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>Сообщения</div>
      {!!chatList?.length && (
        <div className={styles.chats}>
          {chatList.map(
            ({ userPhoto, username, nickName, chatId, advertId, advertTitle, advertPrice, advertPhoto }) => (
              <UserPreview
                img={userPhoto}
                userName={username}
                nickname={nickName}
                isChoosing={isSelect && selectedUser === username && advertId === actualChat.advertId}
                handleClick={() => {
                  handleSelect(username);
                  dispatch(chatAction.getMessages([]));
                  dispatch(
                    chatAction.getActualChat({
                      userPhoto,
                      username,
                      nickName,
                      chatId,
                      advertId,
                      advertTitle,
                      advertPrice,
                      advertPhoto,
                    })
                  );
                  if (chatId) {
                    dispatch(getChatMessages(chatId));
                  }
                  dispatch(chatAction.getSelectedUser({ username, nickName, img: userPhoto }));
                  dispatch(chatAction.getAdvert({ advertId, advertTitle, advertPrice, advertPhoto }));
                }}
              />
            )
          )}
        </div>
      )}
    </div>
  );
};
