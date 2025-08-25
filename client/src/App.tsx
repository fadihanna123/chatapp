import { useEffect, useState } from "react";
import { io } from "socket.io-client";

// Components
import ChatLayout from "@components/ChatLayout";
import LoginLayout from "@components/LoginLayout";
import { MyGlobalContext } from "@core/states/index";
import { getStorage, setStorage } from "@functions/storage";
import { localStorageKeys } from "@utils/consts";
import Header from "@inc/Header";

export const connector = io("http://localhost:5000");

const App: React.FC = () => {
  const [login, setLogin] = useState<boolean>(false);
  const [nickName, setNickName] = useState<string>("");
  const [warning, setWarning] = useState<string>("");
  const [onlineList, setOnlineList] = useState<OnlineListTypes[]>([]);
  const [msgVal, setMsgVal] = useState<string>("");
  const [msgList, setMsgList] = useState<msgListTypes[]>([]);
  const [typingUser, setTypingUser] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [lang, setLang] = useState<Languages>("en");
  const langFromStorage = getStorage(localStorageKeys.Lang);

  useEffect(() => {
    connector?.on("new user", (payload: OnlineListTypes) => {
      setOnlineList((prev) => [...prev, payload]);
    });

    connector?.on("new message", (data: msgListTypes) => {
      setMsgList((prev) => [...prev, data]);
    });

    connector?.on("typing started", (nickName: string) => {
      setIsTyping(true);
      setTypingUser(nickName);
    });

    connector?.on("typing stopped", () => {
      setIsTyping(false);
      setTypingUser("");
    });

    connector?.on("user disconnected", (nickName: string) => {
      const filteredArr = onlineList.filter(
        (item) => item.nickName !== nickName,
      );

      setOnlineList(filteredArr);
    });

    if (!langFromStorage) {
      setStorage(localStorageKeys.Lang, "en");
    }

    setLang(langFromStorage as Languages);

    return () => {
      connector?.off("new user");
      connector?.off("new message");
      connector?.off("user disconnected");
      connector?.off("typing started");
      connector?.off("typing stopped");
    };
  }, [setOnlineList, setMsgList]);

  return (
    <MyGlobalContext.Provider
      value={{
        login,
        nickName,
        warning,
        onlineList,
        msgVal,
        msgList,
        lang,
        setLang,
        setOnlineList,
        setMsgList,
        setMsgVal,
        setNickName,
        setLogin,
        setWarning,
        typingUser,
        setTypingUser,
        isTyping,
        setIsTyping,
      }}
    >
      <div className="container">
        <Header />
        {login ? <ChatLayout /> : <LoginLayout />}
      </div>
    </MyGlobalContext.Provider>
  );
};

export default App;
