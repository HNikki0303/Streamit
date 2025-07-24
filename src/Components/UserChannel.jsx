import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaHistory, FaUserEdit, FaLock, FaUpload ,FaInfoCircle } from "react-icons/fa";
import PaginatedVideoFeed from "./PaginatedVideoFeed";
import AI_Assistant from "./AI_Assistant";

export default function UserChannel() {
  const navigate= useNavigate();
  const [showAssistant,setShowAssistant] = useState(false);

  const [userDetails, setUserDetails] = useState({
    coverImage: null,
    fullName: '',
    avatar: null,
    username: '',
    channelDescription:''
  });

  useEffect(() => {
    const userChannel = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/v1/user/currentUser", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        const data = await res.json();

        if (res.status === 200 || data.statusCode === 200) {
          const user = data.data;
          setUserDetails({
            coverImage: user.coverImage,
            fullName: user.fullName,
            avatar: user.avatar,
            username: user.username,
            channelDescription: user.channelDescription || "",
          });
        }
      } catch (err) {
        console.log(err.message);
      }
    };
    userChannel();
  }, []);

  if (showAssistant) {
    return <AI_Assistant userDetails={userDetails} ></AI_Assistant>
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#432F70] via-[#5E3B73] to-[#713770] text-white font-sans overflow-hidden">
      {/* Cover Image */}
      <div
        className="relative h-32 bg-cover bg-center"
        style={{ backgroundImage: userDetails.coverImage ? `url(${userDetails.coverImage})` : "none" }}
      >
        <div className="absolute top-3 right-4 z-10">
          <img
            src="/chatbot.png"
            alt="AI Assistant"
            className="fixed top-4 right-4 w-18 h-16 z-10 rounded-full border border-[#E95670] hover:scale-105 transition"onClick={() => setShowAssistant(!showAssistant)}
            title="Ask AI Assistant"
          />
        </div>
      </div>
       <div className="h-1 bg-[#E95670] w-full"></div>
      {/* Avatar and Username */}
      <div className="relative px-6 sm:px-10 -mt-12 flex items-end space-x-4 z-20">
        {userDetails.avatar && (
          <img
            src={userDetails.avatar}
            alt="User Avatar"
            className="w-20 h-20 rounded-full border-4 border-white object-cover shadow-lg bg-white"
          />
        )}
        <div className="pb-2">
          <h2 className="text-xxl sm:text-2xl font-bold">{userDetails.username}</h2>
          <p className="text-sm text-pink-200">{userDetails.fullName}</p>
        </div>
      </div>

      {/* Layout */}
      <div className="flex pt-6 ">
        <aside className="sticky w-20 sm:w-24 flex flex-col items-center py-6 space-y-8 bg-white/10 rounded-tr-2xl backdrop-blur-md text-xs text-center">
          <Link to="/UpdateProfile" className="flex flex-col items-center hover:text-[#e95671ce] transition">
            <FaUserEdit size={20} />
            <span className="mt-1">Profile</span>
          </Link>
          <Link to="/publish" className="flex flex-col items-center hover:text-[#e95671ce] transition">
            <FaUpload size={20} />
            <span className="mt-1">Upload</span>
          </Link>
          <Link to="/channel-description" className="flex flex-col items-center hover:text-[#e95671ce] transition">
          <FaInfoCircle size={20} />
          <span className="mt-1">About</span>
          </Link>
          <Link to="/watch-history" className="flex flex-col items-center hover:text-[#e95671ce] transition">
            <FaHistory size={20} />
            <span className="mt-1">History</span>
          </Link>
          <Link to="/security" className="flex flex-col items-center hover:text-[#e95671ce] transition">
            <FaLock size={20} />
            <span className="mt-1">Security</span>
          </Link>
        </aside>

        <main className="flex-1 px-6 sm:px-10 py-2">
          <div className="flex items-center justify-between mb-4 relative">
            <h3 className="text-xl font-semibold text-white bg-opacity-30">My Videos</h3>
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <button className="bg-[#E95670] hover:bg-[#c9435b] text-white px-6 py-2 rounded-full text-lg shadow-sm transition" onClick={()=>{
                navigate('/B');
              }}>
                Search Videos
              </button>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-md min-h-[300px]">
            <PaginatedVideoFeed fetchUrl="http://localhost:8000/api/v1/video/paginated/user"></PaginatedVideoFeed>
          </div>
        </main>
      </div>

      <footer className="text-center text-xs py-6 text-gray-400 mt-10">
        © 2025 StreamIt. All rights reserved.
      </footer>
    </div>
  );
}
