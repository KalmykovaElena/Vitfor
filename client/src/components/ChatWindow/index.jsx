import React from 'react';
import styles from './index.module.scss';
import { ChatHeader } from '../ChatHeader';
import { AdvertPreview } from '../AdvertPreview';
import { ChatInputPanel } from '../ChatInputPanel';
import { MessageArea } from '../MessageArea';

export const ChatWindow = ({ img, userName, userNickName, messages }) => (
  // const dispatch = useDispatch;
  // useEffect(() => {
  // TODO reducer for chat
  //   dispatch(advertId);
  // }, []);
  <div className={styles.wrapper}>
    <ChatHeader img={img} userName={userName} userNickName={userNickName} />
    <AdvertPreview
      name="Котята"
      cost={10}
      img="https://happypik.ru/wp-content/uploads/2019/09/top1-2.jpg"
      className={styles.advert}
    />
    <MessageArea class messages={messages} className={styles.messages} />
    <ChatInputPanel clasName={styles.footer} />
  </div>
);
