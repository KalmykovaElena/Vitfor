import React from 'react';
import { nanoid } from 'nanoid';
import classNames from 'classnames';
import { ChatMessage } from '../ChatMessage';
import styles from './index.module.scss';

export const MessageArea = ({ messages, className }) => (
  <div className={classNames(styles.wrapper, [className])}>
    {messages.map(({ text, messageHandler }) => (
      <ChatMessage key={nanoid()} text={text} messageHandler={messageHandler} />
    ))}
  </div>
);
