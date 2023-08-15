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
  const { messages, user } = useSelector((state) => ({
    messages: state.chat.messages,
    user: state.auth.user,
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
        receiverUserName: user.userName,
        text: message,
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
      <AdvertPreview
        name="Котята"
        cost={10}
        img="https://happypik.ru/wp-content/uploads/2019/09/top1-2.jpg"
        className={styles.advert}
      />
      {chatMessages.length ? (
        <MessageArea class messages={chatMessages} className={styles.messages} />
      ) : (
        <EmptyMessage />
      )}
      <ChatInputPanel handleMessage={handleSendMessage} clasName={styles.footer} />
    </div>
  );
};
