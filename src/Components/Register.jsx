import React, { useState } from "react";

const Register = ({onSuccess}) => {
  const [formValues, setFormValues] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
  });

  const backendBaseUrl = import.meta.env.VITE_BACKEND;
  
  const [avatarFile, setAvatarFile] = useState(null);
  const [coverImageFile, setCoverImageFile] = useState(null);
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

    if (!avatarFile) {
      setMessage("Avatar is required.");
      return;
    }

    setLoading(true);
    setMessage("");
    
    const formData = new FormData();
   
    formData.append("fullName", formValues.fullName);
    formData.append("email", formValues.email);
    formData.append("username", formValues.username);
    formData.append("password", formValues.password); 
    formData.append("avatar", avatarFile);
    if (coverImageFile) formData.append("coverImage", coverImageFile);

    try {
      const res = await fetch(`${backendBaseUrl}/api/v1/user/register`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const data = await res.json();

      if (res.status == 201 || data.statusCode === 200) {
        setMessage(" Registration successful!");
        console.log("User registered:", data);
        if(onSuccess){
          onSuccess();//Then check if a prop onSuccess was passed to the component,
                      //And if it exists, call it as a function.
        }
        // Optionally redirect or clear form
      } else {
        setMessage(data.message || "Registration failed.");
      }
    } catch (err) {
      console.error(err);
      setMessage(`An error occurred while registering:  ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg text-gray-800">
      <h2 className="text-2xl font-bold mb-6 text-center text-[#E95670]">Register</h2>
      {message && <p className="mb-4 text-sm text-red-500">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formValues.fullName}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formValues.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formValues.username}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formValues.password}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <div>
          <label className="block text-sm font-medium mb-1">Avatar <span className="text-red-500">*</span></label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setAvatarFile(e.target.files[0])}
            className="w-full"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Cover Image (optional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setCoverImageFile(e.target.files[0])}
            className="w-full"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#E95670] text-white py-2 rounded hover:bg-[#c9435b] transition"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>

  );
};

export default Register;


//yaha jo disabled karke hai button submit wale mein vo ek html attribute hai , jiske saath lagaoge agar vo true hua to use firse chalne nahi dega
