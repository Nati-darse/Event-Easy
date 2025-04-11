import React from "react";
import ReactDOM from "react-dom/client"; // Ensure you use `react-dom/client` for React 18
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
