import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import "./index.css";
import ErrorBoundary from "./components/errorBoundry";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary>
    <AuthProvider>
      <App />
      <Toaster
        position="top-right"
        toastOptions={{ duration: 3000, style: { fontSize: "14px" } }}
      />
    </AuthProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
