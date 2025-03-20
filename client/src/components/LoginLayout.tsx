import { FC, useCallback, useEffect } from 'react';
import styled from 'styled-components';

// Components
import { connector } from '@core/App';
import { useGlobalContext } from '@states/index';

const LoginLayout: FC = () => {
  const { nickName, setNickName } = useGlobalContext();
  const { setLogin } = useGlobalContext();
  const { warning, setWarning } = useGlobalContext();

  const enterChat = useCallback(() => {
    if (nickName === '') {
      setWarning('You should enter your nickname first!');
    } else {
      connector.on('loginMsg', (msg: string) => {
        if (msg === 'Success' && !warning) {
          setLogin(true);
        } else {
          setLogin(false);
        }
      });

      connector.emit('Join', nickName);
    }
  }, [nickName, setLogin, warning, setWarning]);

  useEffect(() => {
    setTimeout(() => setWarning(''), 3000);
  }, [enterChat, setWarning]);

  return (
    <LoginSection className='container is-flex is-justify-content-center is-align-content-center is-align-items-center'>
      {warning ? (
        <Alert className='tile has-background-dark has-text-white-ter	'>
          {warning}
        </Alert>
      ) : (
        ''
      )}
      <form className='p-2'>
        <section className='field is-horizontal section'>
          <section className='control field-body'>
            <input
              type='text'
              name='nickName'
              value={nickName}
              onChange={(e) => setNickName(e.target.value)}
              className='input'
              placeholder='NickName'
            />
          </section>
          <button
            type='button'
            onClick={enterChat}
            className='button is-info ml-2'
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
