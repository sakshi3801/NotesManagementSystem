import React from "react";
import ReactDOM from "react-dom";
import "./css/index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import {ContextProvider} from './context/Context';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <ContextProvider>
      <App />
    </ContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
