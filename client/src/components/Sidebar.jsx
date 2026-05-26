import React from "react";

import {
  Home,
  UserCircle2,
  LogOut,
  BrainCircuit,
  History,
  PlayCircle,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

import { toast } from "react-toastify";

import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logout();

      toast.success("Logout successful");

      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to logout");
    }
  };

  const navItems = [
    {
      title: "Home",
      icon: <Home size={22} />,
      path: "/",
    },

    {
      title: "Start Interview",
      icon: <PlayCircle size={22} />,
      path: "/start/interview",
    },

    {
      title: "History",
      icon: <History size={22} />,
      path: "/history",
    },
  ];

  return (
    <aside
      className="
        w-[290px]
        h-screen
        sticky
        top-0
        bg-[#09090b]
        border-r
        border-zinc-800
        text-white
        flex
        flex-col
        justify-between
        px-6
        py-7
      "
    >
      {/* Top */}
      <div>
        {/* Logo */}
        <div className="mb-12">
          <div className="flex items-center gap-4">
            {/* Icon */}
            <div
              className="
                w-14
                h-14
                rounded-3xl
                bg-gradient-to-br
                from-blue-500
                to-blue-700
                flex
                items-center
                justify-center
                shadow-lg
              "
            >
              <BrainCircuit size={28} />
            </div>

            {/* Text */}
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                InterviewMock
              </h1>

              <p className="text-zinc-500 text-sm">AI Interview Platform</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="space-y-3">
          {navItems.map((item) => {
            const active = location.pathname === item.path;

            return (
              <button
                key={item.title}
                onClick={() => navigate(item.path)}
                className={`
                  w-full
                  flex
                  items-center
                  gap-4
                  px-5
                  py-4
                  rounded-2xl
                  transition-all
                  duration-200
                  group

                  ${
                    active
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-zinc-900 hover:bg-zinc-800 text-zinc-300"
                  }
                `}
              >
                <div
                  className={`
                    transition-all
                    duration-200
                    ${
                      active
                        ? "text-white"
                        : "text-zinc-400 group-hover:text-white"
                    }
                  `}
                >
                  {item.icon}
                </div>

                <span className="font-medium text-[15px]">{item.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom */}
      <div>
        {/* User Card */}
        <div
          className="
            bg-zinc-900
            border
            border-zinc-800
            rounded-3xl
            p-4
            mb-5
          "
        >
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div
              className="
                w-14
                h-14
                rounded-2xl
                bg-zinc-800
                flex
                items-center
                justify-center
              "
            >
              <UserCircle2 size={34} className="text-zinc-400" />
            </div>

            {/* User Info */}
            <div className="overflow-hidden">
              <h2 className="font-semibold text-lg truncate">
                {user?.name || "User"}
              </h2>

              <p className="text-zinc-500 text-sm truncate">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="
            w-full
            flex
            items-center
            justify-center
            gap-3
            bg-red-600
            hover:bg-red-700
            transition-all
            duration-200
            py-4
            rounded-2xl
            font-semibold
            shadow-lg
          "
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
