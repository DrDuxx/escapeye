import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import CountdownProvider from "./context/CountdownProvider";
import getQueryClient from "./services/queryClient";
import { QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import SongProvider from "./context/SongProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={getQueryClient()}>
      <CountdownProvider minutes={localStorage.getItem("timeLeft") || 60}>
        <SongProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </SongProvider>
      </CountdownProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
