import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { LoginProvider } from "helpers/LoginContext";
import Modal from "react-modal";

Modal.setAppElement("#root");

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <LoginProvider>
    <App />
  </LoginProvider>
);