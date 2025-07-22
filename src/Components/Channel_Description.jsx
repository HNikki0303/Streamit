import React, { useState, useEffect } from "react";
import CommonA from "./CommonA";
import AI_Assistant from "./AI_Assistant";
import { useNavigate } from "react-router-dom";

const ChannelDescription = () => {
  const [showAssistant, setShowAssistant] = useState(false);
  const [description, setDescription] = useState("");
  const [userDetails, setUserDetails] = useState({
    fullName: "",
    username: "",
    avatar: null,
    coverImage: null,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/v1/user/currentUser", {
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok && data?.data) {
          setUserDetails(data.data);
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };
    fetchUser();
  }, []);

  const handleSave = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/v1/user/channelDescription", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ description }),
      });

      const result = await res.json();
      if (res.ok || result.statusCode === 200) {
        alert("Description saved successfully!");
      } else {
        alert("Failed to save description.");
      }
    } catch (err) {
      console.error("Error saving description:", err);
      alert("Error saving description.");
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Left Side */}
      <div className={`transition-all duration-500 ${showAssistant ? "w-[45%]" : "w-full"}`}>
        <CommonA
          userDetails={userDetails}
          showAssistant={showAssistant}
          setShowAssistant={setShowAssistant}
        >
          <div className="p-6 h-full overflow-y-auto">
            <h2 className="text-2xl font-bold text-white mb-4">Channel Description</h2>

            <label className="block text-white mb-2">Describe your channel for a personalised AI assistance</label>
            <textarea
              rows={4}
              placeholder="Enter your channel description here..."
              className="w-full p-3 bg-white/10 text-white rounded resize-y overflow-auto max-h-64"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <button
              onClick={handleSave}
              className="mt-4 bg-[#E95670] hover:bg-[#c9435b] text-white px-4 py-2 rounded transition"
            >
              Save Description
            </button>
          </div>
        </CommonA>
      </div>

      {/* Right Side: AI Assistant */}
      {showAssistant && (
        <div className="w-[55%] h-full overflow-y-auto bg-gradient-to-br from-[#3B1F4D] via-[#5E3B73] to-[#713770] text-white p-6">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 shadow-md h-full">
            <AI_Assistant />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChannelDescription;
