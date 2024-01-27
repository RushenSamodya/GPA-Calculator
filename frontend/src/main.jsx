import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { ModuleContextProvider } from "./context/ModuleContext.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <AuthContextProvider>
        <ModuleContextProvider>
          <App />
        </ModuleContextProvider>
      </AuthContextProvider>
  </React.StrictMode>
);
