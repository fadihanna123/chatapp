import styled from 'styled-components';
import { FC, useEffect, useRef } from 'react';

// Components
import { connector } from '@core/App';
import Header from '@inc/Header';
import { useGlobalContext } from '@states/index';
import OnlineListComp from './OnlineListComp';

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

  const sendMsg = (e: React.FormEvent) => {
    e.preventDefault();
    if (msgVal === '') return;
    const msgTime = new Date();
    connector?.emit('Send message', nickName, msgVal, msgTime);
    setIsTyping(false);
    setMsgVal('');
  };

  const handleTyping = () => {
    if (!isTyping) {
      setIsTyping(true);
      connector?.emit('typing started', nickName);
    }

    clearTimeout(typingTimer);
    typingTimer = setTimeout(() => {
      setIsTyping(false);
      connector?.emit('typing stopped', nickName);
    }, 5000);
  };

  useEffect(() => {
    ref!.current!.scrollTo(0, ref.current!.scrollHeight);
  }, [ref]);

  return (
    <>
      <Header />
      <main className='columns m-2 p-0 section'>
        <OnlineListComp />
        <Section className='column is-three-quarters p-2 has-background-warning has-text-light'>
          <ChatRoom className='chatRoom' ref={ref}>
            <ul>
              {msgList.map((item: msgListTypes, i: number) => (
                <li key={i} className='has-text-dark is-size-4'>
                  <span
                    className={`has-d-inline is-size-4 ${item.author === nickName ? 'has-text-success' : 'has-text-link'}`}
                  >
                    {item.author}
                  </span>
                  : {item.msg}
                </li>
              ))}
            </ul>
          </ChatRoom>
          {typingUser && (
            <div className='has-text-info is-size-4'>
              <span className='has-text-dark has-d-inline is-size-4'>
                {typingUser}
              </span>
              : is typing...
            </div>
          )}
          <SendForm>
            <form className='p-2'>
              <section className='field is-horizontal'>
                <section className='control field-body has-icons-left has-icons-right'>
                  <input
                    type='text'
                    name='msg'
                    value={msgVal}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') sendMsg(e);
                    }}
                    onChange={(e) => {
                      setMsgVal(e.target.value);
                      handleTyping();
                    }}
                    className='input resize'
                    placeholder='Enter your message here...'
                  />
                </section>
                <button
                  type='button'
                  onClick={sendMsg}
                  className='button is-success ml-2'
                >
                  Send
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
  height: 500px;
  transition: 0.3s;
`;

const SendForm = styled.section``;
