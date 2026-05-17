import React from "react";

import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const NotFound = () => {
  const { isLoggedIn, loading } = useAuth();

  // wait until auth check finishes
  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  // logged in user
  if (isLoggedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  // logged out user
  return <Navigate to="/" replace />;
};

export default NotFound;
