import "./styles/index.scss";

import React from "react";

import ReactDOM from "react-dom/client";

import App from "./App";

import "@config/configureMobX";

const rootElement = document.getElementById("root") as HTMLElement;
const root = ReactDOM.createRoot(rootElement);

root.render(<App />);
