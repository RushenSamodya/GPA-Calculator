import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ModuleContextProvider } from "./context/ModuleContext.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <ModuleContextProvider>
        <App />
      </ModuleContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
