import React from "react";
import ReactDOM from "react-dom/client";
import "./i18n";
import './styles/style.css';

import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./App.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
