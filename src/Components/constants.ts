export const API_KEY = '//enter your openai-api key'
export const systemMessage = {
  role: 'system',
  content: "Hello, I'm GeekLib AIChatbot! Ask me anything!",
};

export type MessageObj = {
  content: string;
  sentTime: string;
  sender: 'ChatGPT' | 'user';
  direction?: 'incoming' | 'outgoing';
};