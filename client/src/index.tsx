import 'normalize.css';
import 'bulma';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';

import App from './App';
import { GlobalStyles } from './styles';

const el = document.getElementById('root')! as HTMLDivElement;
const root = ReactDOM.createRoot(el);

root.render(
  <React.StrictMode>
    <GlobalStyles />
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>
);
