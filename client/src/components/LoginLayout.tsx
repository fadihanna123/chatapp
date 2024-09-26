import { useEffect, useCallback } from "react";
import { useRecoilState } from "recoil";
import { io } from "socket.io-client";
import { loginState, nickNameState, warningState } from "States";
import styled from "styled-components";

const socket = io("http://localhost:5000");

const LoginLayout = () => {
  const [nickName, setNickName] = useRecoilState(nickNameState);
  const [, setLogin] = useRecoilState(loginState);
  const [warning, setWarning] = useRecoilState(warningState);

  const enterChat = useCallback(() => {
    if (nickName === "") {
      setWarning("You should enter your nickname first!");
    } else {
      socket.on("loginMsg", (msg: string) => {
        msg === "Success" && !warning ? setLogin(true) : setLogin(false);
      });
      socket.emit("Join", nickName);
    }
  }, [nickName, setLogin, warning, setWarning]);

  useEffect(() => {
    setTimeout(() => setWarning(""), 3000);
  }, [enterChat, setWarning]);

  return (
    <LoginSection className="container is-flex is-justify-content-center is-align-content-center is-align-items-center">
      {warning ? (
        <Alert className="tile has-background-dark has-text-white-ter	">
          {warning}
        </Alert>
      ) : (
        ""
      )}
      <form className="p-2">
        <section className="field is-horizontal section">
          <section className="control field-body">
            <input
              type="text"
              name="nickName"
              value={nickName}
              onChange={(e) => setNickName(e.target.value)}
              className="input"
              placeholder="NickName"
            />
          </section>
          <button
            type="button"
            onClick={enterChat}
            className="button is-info ml-2"
          >
            Enter
          </button>
        </section>
      </form>
    </LoginSection>
  );
};

export default LoginLayout;

const LoginSection = styled.main`
  width: 100vw;
  height: 100vh;
  transition: 0.3s;
`;

const Alert = styled.section`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 20px;
  transition: all 0.3s;
`;
