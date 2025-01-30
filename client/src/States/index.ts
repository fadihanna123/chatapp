import { createContext, useContext } from "react";
import { OnlineListTypes, msgListTypes } from "typings";

interface MyGlobalContextInterface {
  login: boolean;
  nickName: string;
  warning: string;
  onlineList: OnlineListTypes[];
  msgVal: string;
  msgList: msgListTypes[];
  setOnlineList: (onlineList: OnlineListTypes[]) => void;
  setMsgVal: (msgVal: string) => void;
  setMsgList: (msgList: msgListTypes[]) => void;
  setNickName: (nickName: string) => void;
  setLogin: (login: boolean) => void;
  setWarning: (warning: string) => void;
  isTyping: boolean;
  setIsTyping: (isTyping: boolean) => void;
  typingUser: string;
  setTypingUser: (typingUser: string) => void;
}

export const MyGlobalContext = createContext<MyGlobalContextInterface>({
  login: false,
  nickName: "",
  warning: "",
  onlineList: [],
  msgVal: "",
  msgList: [],
  setOnlineList: () => {},
  setMsgList: () => {},
  setMsgVal: () => {},
  setNickName: () => {},
  setLogin: () => {},
  setWarning: () => {},
  isTyping: false,
  setIsTyping: () => {},
  typingUser: "",
  setTypingUser: () => {},
});

export const useGlobalContext = () => useContext(MyGlobalContext);
