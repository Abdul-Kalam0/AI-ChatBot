import React, { useState } from "react";

import { useAuth } from "../context/AuthContext";

import { Link, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();

  const { loading, register } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  // handle input
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await register(form);

      toast.success("Registered successfully");

      navigate("/");
    } catch (error) {
      toast.error(error || "Registration failed");
    }
  };

  return (
    <div
      className="
        min-h-screen
        relative
        bg-black
        overflow-hidden
        flex
        items-center
        justify-end
        px-6
        md:px-24
      "
    >
      {/* Background Image */}
      <div
        className="
          absolute
          inset-0
          bg-no-repeat
          bg-left
          bg-contain
          opacity-70
        "
        style={{
          backgroundImage: "url('/FavIcon.png')",
        }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Register Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8">
          {/* Heading */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900">Create Account</h1>

            <p className="text-gray-500 mt-3">
              Start practicing AI mock interviews
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Name
              </label>

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="
                  w-full
                  border
                  border-gray-300
                  rounded-xl
                  px-4
                  py-3
                  outline-none
                  focus:ring-2
                  focus:ring-black
                "
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="
                  w-full
                  border
                  border-gray-300
                  rounded-xl
                  px-4
                  py-3
                  outline-none
                  focus:ring-2
                  focus:ring-black
                "
              />
            </div>

            {/* Password */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Create a password"
                className="
                  w-full
                  border
                  border-gray-300
                  rounded-xl
                  px-4
                  py-3
                  outline-none
                  focus:ring-2
                  focus:ring-black
                "
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                bg-black
                text-white
                py-3
                rounded-xl
                font-medium
                hover:bg-gray-800
                transition
                duration-200
                disabled:opacity-50
              "
            >
              {loading ? "Creating account..." : "Register"}
            </button>
          </form>

          {/* Login Link */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?
            <Link
              to="/"
              className="
                text-black
                font-semibold
                ml-1
                hover:underline
              "
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
