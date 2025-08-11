// Login.jsx
import React from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";

const Login = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Welcome Back
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Please log in to your account
        </p>

        {/* Email Field */}
        <div className="mb-5">
          <label className="block text-gray-700 font-semibold mb-2">Email</label>
          <div className="flex items-center border rounded-lg px-3 py-2 focus-within:border-blue-500 transition">
            <FaEnvelope className="text-gray-400 mr-3" />
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 outline-none text-gray-700"
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="mb-5">
          <label className="block text-gray-700 font-semibold mb-2">Password</label>
          <div className="flex items-center border rounded-lg px-3 py-2 focus-within:border-blue-500 transition">
            <FaLock className="text-gray-400 mr-3" />
            <input
              type="password"
              placeholder="Enter your password"
              className="flex-1 outline-none text-gray-700"
            />
            <FaEye className="text-gray-400 cursor-pointer" />
          </div>
        </div>

        {/* Login Button */}
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition duration-300">
          Login
        </button>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-1 border-gray-300" />
          <span className="mx-3 text-gray-500">OR</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        {/* Register Link */}
        <p className="text-center text-gray-600">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline font-medium">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;