import styled from "styled-components";
import { FC, useEffect, useRef } from "react";
import { FaPaperPlane } from "react-icons/fa";

// Components
import { connector } from "@core/App";
import { useGlobalContext } from "@core/states/index";
import { isTypingText, send, sendMsgText } from "@core/utils";
import useTranslate from "@core/hooks/useTranslate";
import OnlineListComp from "./OnlineListComp";

const ChatLayout: FC = () => {
  const {
    nickName,
    msgVal,
    setMsgVal,
    msgList,
    isTyping,
    setIsTyping,
    typingUser,
  } = useGlobalContext();

  let typingTimer: ReturnType<typeof setTimeout>;
  const ref = useRef<HTMLDivElement>(null);

  const { lang } = useGlobalContext();

  const sendMsg = (e: React.FormEvent) => {
    e.preventDefault();
    if (msgVal === "") return;
    const msgTime = new Date();
    connector?.emit("send message", nickName, msgVal, msgTime);
    setIsTyping(false);
    setMsgVal("");
  };

  const handleTyping = () => {
    if (!isTyping) {
      setIsTyping(true);
      connector?.emit("typing started", nickName);
    }

    clearTimeout(typingTimer);
    typingTimer = setTimeout(() => {
      setIsTyping(false);
      connector?.emit("typing stopped", nickName);
    }, 5000);
  };

  useEffect(() => {
    ref.current!.scrollTo(0, ref.current!.scrollHeight);
  }, [ref]);

  return (
    <>
      <main className="columns mt-2 mx-auto p-0 section chatRoomWrapper">
        <OnlineListComp />
        <Section className="column is-three-quarters p-2 has-background-warning has-text-light">
          <ChatRoom className="chatRoom" ref={ref}>
            <ul>
              {msgList.map((item: msgListTypes) => (
                <li key={item._id} className="has-text-dark is-size-4">
                  <span
                    className={`has-d-inline is-size-4 ${item.author === nickName ? "has-text-success" : "has-text-link"}`}
                  >
                    <p
                      style={{
                        padding: ".25em",
                        textAlign: item.author === nickName ? "left" : "right",
                        overflowWrap: "normal",
                      }}
                    >
                      <span
                        className={`tag is-large ${item.author === nickName ? "is-success" : "is-info"}`}
                      >
                        {item.msg.charAt(0).toUpperCase() + item.msg.slice(1)}
                      </span>
                    </p>
                  </span>
                </li>
              ))}
            </ul>
          </ChatRoom>
          {typingUser && (
            <div className="has-text-dark is-size-4">
              <span className="has-d-inline is-size-4">
                {typingUser.charAt(0).toUpperCase() + typingUser.slice(1)}
              </span>
              {useTranslate(isTypingText, lang)}
            </div>
          )}
          <SendForm>
            <form className="p-2">
              <section className="field is-horizontal">
                <section className="control field-body has-icons-left has-icons-right">
                  <input
                    type="text"
                    name="msg"
                    value={msgVal}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") sendMsg(e);
                    }}
                    onChange={(e) => {
                      setMsgVal(e.target.value);
                      handleTyping();
                    }}
                    className="input resize"
                    placeholder={`${useTranslate(sendMsgText, lang)}`}
                  />
                </section>
                <button
                  type="button"
                  onClick={sendMsg}
                  className="button ml-2 is-success"
                >
                  <FaPaperPlane className="mr-2" /> {useTranslate(send, lang)}
                </button>
              </section>
            </form>
          </SendForm>
        </Section>
      </main>
    </>
  );
};

export default ChatLayout;

const Section = styled.section`
  border: 1px solid #000;
  transition: 0.3s;
`;

const ChatRoom = styled.div`
  width: 100%;
  overflow: scroll;
  height: 530px;
  transition: 0.3s;
`;

const SendForm = styled.section``;
