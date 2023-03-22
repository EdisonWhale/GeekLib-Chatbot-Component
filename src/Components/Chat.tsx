import React, { useState, useEffect } from 'react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  MessageInput,
  TypingIndicator,
} from '@chatscope/chat-ui-kit-react';
import MessageComponent from './MessageComponent';
import { MessageObj, API_KEY, systemMessage } from './constants';
import './buttonStyles.css';

function Chat() {
    const [messages, setMessages] = useState<MessageObj[]>(() => {
      const savedMessages = localStorage.getItem('chatMessages');
      return savedMessages ? JSON.parse(savedMessages) : [
        {
          content: "Hello, I'm GeekLib AIChatbot! Ask me anything!!",
          sentTime: 'just now',
          sender: 'ChatGPT',
        },
      ];
    });
    const [isTyping, setIsTyping] = useState(false);
  
    useEffect(() => {
      localStorage.setItem('chatMessages', JSON.stringify(messages));
    }, [messages]);
  
    const handleSend = async (message: string) => {
      const newMessage: MessageObj = {
        content: message,
        direction: 'outgoing',
        sender: 'user',
        sentTime: 'just now',
      };
  
      const newMessages = [...messages, newMessage];
  
      setMessages(newMessages);
  
      setIsTyping(true);
      await processMessageToChatGPT(newMessages);
    };
  
    async function processMessageToChatGPT(chatMessages: MessageObj[]) {
      let apiMessages = chatMessages.map((messageObject) => {
        let role = '';
        if (messageObject.sender === 'ChatGPT') {
          role = 'assistant';
        } else {
          role = 'user';
        }
        return { role: role, content: messageObject.content };
      });
  
      const apiRequestBody = {
        model: 'gpt-3.5-turbo',
        messages: [systemMessage, ...apiMessages],
      };
  
      await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiRequestBody),
      })
        .then((data) => {
          return data.json();
        })
        .then((data) => {
          setMessages([
            ...chatMessages,
            {
              content: data.choices[0].message.content,
              sender: 'ChatGPT',
              sentTime: 'just now',
            },
          ]);
          setIsTyping(false);
        });
    }
    const resetConversation = () => {
      setMessages([
        {
          content: "Hello, I'm GeekLib AIChatbot! Ask me anything!",
          sentTime: 'just now',
          sender: 'ChatGPT',
        },
      ]);
    };

    
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '120vh',
      }}
    >
      <h1 className="title">GeekLib AIChatbot</h1>
      <button onClick={resetConversation} className="button-51">
        Reset Conversation
      </button>
      <div style={{ position: 'relative', height: '800px', width: '700px' }}>
        <MainContainer>
          <ChatContainer>
            <MessageList
              scrollBehavior="smooth"
              typingIndicator={
                isTyping ? <TypingIndicator content="GeekLib is typing" /> : null
              }
            >
              {messages.map((message, i) => (
                <MessageComponent key={i} message={message} />
              ))}
            </MessageList>
            <MessageInput placeholder="Type a message..." onSend={handleSend} />
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  );
}

export default Chat;