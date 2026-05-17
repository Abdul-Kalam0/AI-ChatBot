import React from "react";

import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const NotFound = () => {
  const { isLoggedIn } = useAuth();

  // logged in user
  if (isLoggedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  // logged out user
  return <Navigate to="/" replace />;
};

export default NotFound;
