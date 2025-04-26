declare global {
  export interface OnlineListTypes {
    id: number;
    nickName: string;
    joinedDatenTime: Date;
    userId: string;
  }

  export interface msgListTypes {
    _id: string;
    id: string;
    author: string;
    msg: string;
    msgDatenTime: Date;
  }

  interface MyGlobalContextInterface {
    login: boolean;
    nickName: string;
    warning: string;
    onlineList: OnlineListTypes[];
    msgVal: string;
    msgList: msgListTypes[];
    lang: Languages;
    setLang: (lang: Languages) => void;
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

  type Translations = typeof import('@translations/en.json');
  type Languages = 'en' | 'sw' | undefined;
}

export {};
