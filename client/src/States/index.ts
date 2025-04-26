import { createContext, useContext } from 'react';

export const MyGlobalContext = createContext<MyGlobalContextInterface>({
  login: false,
  nickName: '',
  warning: '',
  onlineList: [],
  msgVal: '',
  msgList: [],
  lang: 'en',
  setLang: () => {},
  setOnlineList: () => {},
  setMsgList: () => {},
  setMsgVal: () => {},
  setNickName: () => {},
  setLogin: () => {},
  setWarning: () => {},
  isTyping: false,
  setIsTyping: () => {},
  typingUser: '',
  setTypingUser: () => {},
});

export const useGlobalContext = () => useContext(MyGlobalContext);
