import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const ProtectedRoute = () => {
  const { isLoggedIn, loading } = useAuth();

  // loading spinner
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="w-14 h-14 border-4 border-gray-700 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  // not authenticated
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // authenticated routes
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default ProtectedRoute;
