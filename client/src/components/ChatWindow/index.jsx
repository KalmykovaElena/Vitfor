import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './index.module.scss';
import { ChatHeader } from '../ChatHeader';
import { AdvertPreview } from '../AdvertPreview';
import { ChatInputPanel } from '../ChatInputPanel';
import { MessageArea } from '../MessageArea';
import { sendMessage } from '../../http/Chat/sendMessage';
import { EmptyMessage } from '../EmptyMessage';

export const ChatWindow = () => {
  const { messages, user, advertId, username } = useSelector((state) => ({
    messages: state.chat.messages,
    user: state.auth.user,
    username: state.chat.selectedUser.username,
    advertId: state.chat.advert.advertId,
  }));
  const [chatMessages, setChatMessages] = useState([]);
  const handleSendMessage = (message) => {
    if (message) {
      setChatMessages([
        ...chatMessages,
        {
          dateOfCreation: new Date(),
          senderId: user.userId,
          text: message,
        },
      ]);
      sendMessage({
        receiverUserName: username,
        text: message,
        advertId,
      });
    }
  };
  useEffect(() => {
    setChatMessages(messages);

    return () => {
      setChatMessages([]);
    };
  }, [messages]);
  return (
    <div className={styles.wrapper}>
      <ChatHeader />
      <AdvertPreview className={styles.advert} />
      {chatMessages.length ? (
        <MessageArea class messages={chatMessages} className={styles.messages} />
      ) : (
        <EmptyMessage />
      )}
      <ChatInputPanel handleMessage={handleSendMessage} clasName={styles.footer} />
    </div>
  );
};
