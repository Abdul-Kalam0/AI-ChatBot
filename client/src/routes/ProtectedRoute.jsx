import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

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
  // authenticated layout
  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 bg-[#0a0a0a] overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default ProtectedRoute;
