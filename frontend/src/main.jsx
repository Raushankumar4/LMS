import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { UserContextProvider } from "./context/UserContex.jsx";
import { CourseContextProvider } from "./context/CourseContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <UserContextProvider>
    <CourseContextProvider>
      <App />
    </CourseContextProvider>
  </UserContextProvider>
);
