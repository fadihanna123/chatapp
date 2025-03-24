import { connector } from '@core/App';

export const enterChat = (loginPayload: Partial<MyGlobalContextInterface>) => {
  if (loginPayload.nickName === '') {
    loginPayload.setWarning?.('You should enter your nickname first!');
  } else {
    connector.on('loginMsg', (msg: string) => {
      if (msg === 'Success' && !loginPayload.warning) {
        loginPayload.setLogin?.(true);
      } else {
        loginPayload.setLogin?.(false);
      }
    });

    connector.emit('join', loginPayload.nickName);
  }
};

export const onEnterKeyPress = (
  e: React.KeyboardEvent<HTMLInputElement>,
  { nickName, warning, setWarning, setLogin }: Partial<MyGlobalContextInterface>
) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    enterChat({ nickName, warning, setWarning, setLogin });
  }
};
