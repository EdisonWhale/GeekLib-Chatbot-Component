import React from 'react';
import { Message, MessageModel } from '@chatscope/chat-ui-kit-react';
import { MessageObj } from './constants';

interface MessageComponentProps {
  message: MessageObj;
}

const MessageComponent: React.FC<MessageComponentProps> = ({ message }) => {
  const position =
    message.sender === 'ChatGPT' ? 'single' : 'first';

  const model: MessageModel = {
    message: message.content,
    sentTime: message.sentTime,
    sender: message.sender,
    direction: message.sender === 'ChatGPT' ? 'incoming' : 'outgoing',
    position,
  };

  return <Message model={model} />;
};

export default MessageComponent;
