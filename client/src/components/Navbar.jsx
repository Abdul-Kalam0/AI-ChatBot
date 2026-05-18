import React from "react";
import { LogOut, UserCircle2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const Navbar = () => {
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
    <nav className="w-full bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div>
          <h1 className="text-2xl font-bold text-black tracking-tight">
            InterviewMock AI
          </h1>

          <p className="text-sm text-gray-500">
            Practice AI-powered mock interviews
          </p>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-5">
          {/* Profile */}
          <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-full">
            <UserCircle2 size={28} className="text-gray-700" />

            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-gray-800">
                {user?.name || "User"}
              </p>

              {/* <p className="text-xs text-gray-500">{user?.email}</p> */}
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition duration-200"
          >
            <LogOut size={18} />

            <span className="hidden sm:block">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
