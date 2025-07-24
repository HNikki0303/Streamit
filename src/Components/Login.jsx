// components/Login.jsx
import React, { useState } from "react";

const Login = ({ onSuccess }) => {
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
  });

   const backendBaseUrl = import.meta.env.VITE_BACKEND; 
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`${backendBaseUrl}/api/v1/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },// optional: if your backend uses cookies
        body: JSON.stringify(formValues),
        credentials: "include", // include cookies in the request
      });

      const data = await res.json();

      if (res.status === 200) {
        setMessage("Login successful!");
        console.log("User logged in:", data);
        if (onSuccess) {
          onSuccess(); // trigger onSuccess callback
        }
      } else {
        setMessage(data.message || "Login failed.");
      }
    } catch (err) {
      console.error("Error during login:", err);
      setMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center space-y-6 max-w-md mx-auto">
      <h2 className="text-3xl font-bold text-[#E95670]">Login</h2>
      {message && <p className="mb-4 text-sm text-red-500">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formValues.username}
          onChange={handleChange}
          className="block w-full px-4 py-2 rounded border border-gray-300"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formValues.password}
          onChange={handleChange}
          className="block w-full px-4 py-2 rounded border border-gray-300"
          required
        />
        <button
          type="submit"
          className="bg-[#E95670] text-white px-6 py-2 rounded shadow"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
