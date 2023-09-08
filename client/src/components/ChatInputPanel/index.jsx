import React, { useState } from 'react';
import classNames from 'classnames';
import styles from './index.module.scss';
import { TextAreaComponent as TextArea } from '../common/TextArea';
import Button from '../common/button';

export const ChatInputPanel = ({ handleMessage, clasName }) => {
  const [textAreaValue, setTextAreaValue] = useState('');
  const handleSendMessage = () => {
    handleMessage(textAreaValue);
    setTextAreaValue('');
  };
  return (
    <div className={classNames(styles.wrapper, [clasName])}>
      <div className={styles.text}>Сообщение</div>
      <div className={styles.inputPanel}>
        <div className={styles.textarea}>
          <TextArea
            value={textAreaValue}
            maxLength={3000}
            onChange={(event) => setTextAreaValue(event.target.value)}
            placeholder="Введите сообщение"
            onPressEnter={(event) => {
              event.preventDefault();
              handleSendMessage();
            }}
          />
        </div>
        <div className={styles.buttonDiv}>
          <Button
            handleClick={() => handleSendMessage(textAreaValue)}
            name="Отправить"
            type="primary"
            className={styles.button}
          />
        </div>
      </div>
    </div>
  );
};
