import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-7xl font-bold mb-4">404</h1>

        <p className="text-zinc-400 text-lg mb-6">Page not found</p>

        <Link
          to="/dashboard"
          className="
            bg-blue-600
            hover:bg-blue-700
            px-6
            py-3
            rounded-xl
            transition
          "
        >
          Go Back
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
