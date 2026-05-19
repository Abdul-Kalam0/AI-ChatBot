import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NotFound = () => {
  const { isLoggedIn, loading } = useAuth();

  // loading spinner
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="w-14 h-14 border-4 border-gray-700 border-t-blue-500 rounded-full animate-spin"></div>
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
