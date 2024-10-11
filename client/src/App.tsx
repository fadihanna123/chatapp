import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { io } from "socket.io-client";
import ChatLayout from "components/ChatLayout";
import LoginLayout from "components/LoginLayout";
import { loginState } from "States";

const App = () => {
  const [login] = useRecoilState(loginState);

  useEffect(() => {
    io("http://localhost:5000");
  }, []);

  return <>{login ? <ChatLayout /> : <LoginLayout />}</>;
};

export default App;
