import React, { useState } from "react";

import { useAuth } from "../context/AuthContext";

import { Link, useNavigate } from "react-router-dom";

import { GoogleLogin } from "@react-oauth/google";

import API from "../services/api";

import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  const { loading, login, checkAuth } = useAuth();

  const [form, setForm] = useState({
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

  // normal login
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(form);

      toast.success("Login successful");

      navigate("/dashboard");
    } catch (error) {
      toast.error(error || "Login failed");
    }
  };

  // google login
  const handleGoogleLogin = async (credentialResponse) => {
    try {
      await API.post("/auth/google", {
        credential: credentialResponse.credential,
      });

      await checkAuth();

      toast.success("Login successful");

      navigate("/dashboard");
    } catch (error) {
      error.response?.data?.message || "Google login failed";
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

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8">
          {/* Heading */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900">Welcome Back</h1>

            <p className="text-gray-500 mt-3">
              Login to continue your interview practice
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
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
                placeholder="Enter your password"
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
              {loading ? "Loading..." : "Login"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-[1px] bg-gray-300"></div>

            <span className="px-3 text-sm text-gray-500">OR</span>

            <div className="flex-1 h-[1px] bg-gray-300"></div>
          </div>

          {/* Google Login */}
          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => {
                console.log("Google Login Failed");
              }}
            />
          </div>

          {/* Register Link */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Don&apos;t have an account?
            <Link
              to="/register"
              className="
                text-black
                font-semibold
                ml-1
                hover:underline
              "
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
