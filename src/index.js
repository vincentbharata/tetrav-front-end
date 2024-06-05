import React from "react";
import App from "./App";

import ReactDOM from 'react-dom';

import { LoginProvider } from "helpers/LoginContext";
import Modal from "react-modal";

Modal.setAppElement("#root");

ReactDOM.render(
    <LoginProvider>
      <App />
    </LoginProvider>,
    document.getElementById('root')
  );