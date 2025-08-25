import "normalize.css";
import "bulma";
import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import "./styles/main.css";

const el = document.getElementById("root")! as HTMLDivElement;
const root: ReactDOM.Root = ReactDOM.createRoot(el);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
