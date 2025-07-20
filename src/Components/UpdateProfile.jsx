import React, { useEffect, useState } from "react";
import CommonA from "./CommonA";
import UpdateProfileForm from "./UpdateProfileForm";
import AI_Assistant from "./AI_Assistant";

const UpdateProfile = () => {
  const [userDetails, setUserDetails] = useState({
    fullName: "",
    username: "",
    avatar: null,
    coverImage: null,
  });

  const [showAssistant, setShowAssistant] = useState(false);

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

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Left: Profile Section */}
      <div className={`transition-all duration-500 ${showAssistant ? "w-[45%]" : "w-full"}`}>
        <CommonA
          userDetails={userDetails}
          showAssistant={showAssistant}
          setShowAssistant={setShowAssistant}
        >
          <UpdateProfileForm
            userDetails={userDetails}
            setUserDetails={setUserDetails}
          />
        </CommonA>
      </div>

      {/* Right: AI Assistant (Only visible when state is true) */}
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

export default UpdateProfile;
