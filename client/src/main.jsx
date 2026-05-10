import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import Interview from "./pages/Interview.jsx";
import "./index.css";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  {
    path: "/interview",
    element: <Interview />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
