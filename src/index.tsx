import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./pages/App";
import Prodform from "./pages/Prodform";
import "bootstrap/dist/css/bootstrap.min.css";
import { Client, Provider, cacheExchange, fetchExchange } from "urql";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const client = new Client({
  url: "http://localhost:4000/graphql",
  exchanges: [cacheExchange, fetchExchange],
});

root.render(
  <Provider value={client}>
    <React.StrictMode>
      <App />
      <div className="content">
        <Prodform />
      </div>
    </React.StrictMode>
  </Provider>
);
