import React from 'react';
import { nanoid } from 'nanoid';
import { ChatMessage } from '../ChatMessage';

export const MessageArea = ({ messages }) => (
  <div>
    {messages.map(({ text, messageHandler }) => (
      <ChatMessage key={nanoid()} text={text} messageHandler={messageHandler} />
    ))}
  </div>
);
