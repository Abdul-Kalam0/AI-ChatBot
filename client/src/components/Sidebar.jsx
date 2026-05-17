import React from "react";
import { LayoutDashboard, LogOut, UserCircle2 } from "lucide-react";

import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const Sidebar = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logout successful");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to logout");
    }
  };

  return (
    <div className="w-72 min-h-screen bg-[#111111] text-white flex flex-col justify-between border-r border-gray-800">
      {/* Top Section */}
      <div>
        {/* Logo */}
        <div className="px-6 py-6 border-b border-gray-800">
          <h1 className="text-3xl font-bold">InterviewMock AI</h1>

          <p className="text-gray-400 text-sm mt-1">
            Practice AI-powered mock interviews
          </p>
        </div>

        {/* Navigation */}
        <div className="p-4 space-y-3">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition">
            <LayoutDashboard size={20} />

            <span className="font-medium">Dashboard</span>
          </button>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="p-4 border-t border-gray-800">
        {/* Profile */}
        <div className="flex items-center gap-3 bg-[#1b1b1b] p-3 rounded-xl mb-4">
          <UserCircle2 size={40} className="text-gray-300" />

          <div>
            <h3 className="font-semibold">{user?.name || "User"}</h3>

            <p className="text-sm text-gray-400">{user?.email}</p>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 transition px-4 py-3 rounded-xl font-medium"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
