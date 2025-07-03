// components/Login.jsx
import React from "react";

export default function Login() {
  return (
    <div className="text-center space-y-6">
      <h2 className="text-3xl font-bold text-[#E95670]">Login</h2>
      <input
        type="email"
        placeholder="Email"
        className="block w-full px-4 py-2 rounded border border-gray-300"
      />
      <input
        type="password"
        placeholder="Password"
        className="block w-full px-4 py-2 rounded border border-gray-300"
      />
      <button className="bg-[#E95670] text-white px-6 py-2 rounded shadow">
        Submit
      </button>
    </div>
  );
}
