import 'drag-drop-touch'; // Polyfill för touch-stöd – MÅSTE vara först
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import "bootswatch/dist/quartz/bootstrap.min.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
