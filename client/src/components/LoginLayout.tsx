import { FC, useEffect } from 'react';
import styled from 'styled-components';

// Components
import { useGlobalContext } from '@states/index';
import { enterChat, onEnterKeyPress } from '@core/functions';

const LoginLayout: FC = () => {
  const { nickName, setNickName, warning, setWarning, setLogin } =
    useGlobalContext();

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
              onKeyDown={(e) => {
                onEnterKeyPress(e, { nickName, warning, setWarning, setLogin });
              }}
              className='input'
              placeholder='NickName'
            />
          </section>
          <div className='enterBtnContainer ml-2'>
            <button
              type='button'
              className='button is-info enterBtn'
              onClick={() => {
                enterChat({ nickName, warning, setWarning, setLogin });
              }}
            >
              Enter
            </button>
          </div>
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
