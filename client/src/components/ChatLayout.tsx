import Header from 'inc/Header';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { io } from 'socket.io-client';
import {
  nickNameState,
  onlineListState,
  msgValState,
  msgListState,
} from 'States';
import styled from 'styled-components';
import { msgListTypes, OnlineListTypes } from 'typings';
import OnlineListComp from './OnlineListComp';

const socket = io('http://localhost:5000');

const ChatLayout = () => {
  const [nickName] = useRecoilState(nickNameState);
  const [, setOnlineList] = useRecoilState(onlineListState);
  const [msgVal, setMsgVal] = useRecoilState(msgValState);
  const [msgList, setMsgList] = useRecoilState(msgListState);

  const sendMsg = () => {
    const msgTime = new Date();
    socket?.emit('Send message', nickName, msgVal, msgTime);
  };

  useEffect(() => {
    socket?.on('OnlineList', (data: OnlineListTypes[]) => {
      setOnlineList(data);
    });
    socket?.on('Messages', (data: msgListTypes[]) => {
      setMsgList(data);
    });
  }, [setOnlineList, setMsgList]);

  return (
    <>
      <Header />
      <main className='columns m-2 p-0 section'>
        <OnlineListComp />
        <Section className='column is-three-quarters p-2 has-background-warning has-text-light'>
          <ChatRoom className='chatRoom'>
            <ul>
              {msgList.map((item: msgListTypes) => (
                <li key={item._id} className='has-text-info is-size-4'>
                  <span className='has-text-dark has-d-inline is-size-4'>
                    {item.author}
                  </span>
                  : {item.msg}
                </li>
              ))}
            </ul>
          </ChatRoom>
          <SendForm>
            <form className='p-2'>
              <section className='field is-horizontal'>
                <section className='control field-body has-icons-left has-icons-right'>
                  <input
                    type='text'
                    name='msg'
                    value={msgVal}
                    onChange={(e) => setMsgVal(e.target.value)}
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

const ChatRoom = styled.section`
  width: 100%;
  overflow: scroll;
  height: 500px;
  transition: 0.3s;
`;

const SendForm = styled.section``;
