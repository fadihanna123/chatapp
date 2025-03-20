import 'normalize.css';
import 'bulma';
import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { GlobalStyles } from './styles';

const el = document.getElementById('root')! as HTMLDivElement;
const root: ReactDOM.Root = ReactDOM.createRoot(el);

root.render(
  <React.StrictMode>
    <GlobalStyles />
    <App />
  </React.StrictMode>
);
