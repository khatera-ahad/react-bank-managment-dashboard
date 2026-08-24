import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.jsx";
import Header from "./components/Sidebar.jsx";
import Sidebar from "./components/Transactions.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <App />

    </HelmetProvider>
  </React.StrictMode>
);