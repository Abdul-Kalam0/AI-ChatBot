import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";

import App from "./App.jsx";
import Interview from "./pages/Interview.jsx";
import Feedback from "./pages/Feedback.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import NotFound from "./pages/NotFound.jsx";

import { AuthProvider } from "./context/AuthContext.jsx";

import PublicRoute from "./routes/PublicRoute.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter([
  // =========================
  // PUBLIC ROUTES
  // =========================
  {
    element: <PublicRoute />,
    children: [
      {
        path: "/",
        element: <Login />,
      },

      {
        path: "/register",
        element: <Register />,
      },
    ],
  },

  // =========================
  // PROTECTED ROUTES
  // =========================
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/dashboard",
        element: <App />,
      },

      {
        path: "/interview",
        element: <Interview />,
      },

      {
        path: "/feedback/:interviewId",
        element: <Feedback />,
      },
    ],
  },

  // =========================
  // 404 ROUTE for Invalid route after login
  // =========================
  {
    path: "*",
    element: <NotFound />,
  },
]);

createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
      />
    </AuthProvider>
  </GoogleOAuthProvider>,
);
