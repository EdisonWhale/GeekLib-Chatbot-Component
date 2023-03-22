export const API_KEY = '//enter your openai-api key here '

export const systemMessage = {
  role: 'system',
  content: "Explain things like you're talking to a software professional with 2 years of experience.",
};

export type MessageObj = {
  content: string;
  sentTime: string;
  sender: 'ChatGPT' | 'user';
  direction?: 'incoming' | 'outgoing';
};
