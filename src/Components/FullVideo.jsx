import React, { useState } from 'react';
import AI_Assistant from './AI_Assistant';
import { useLocation } from 'react-router-dom';

const FullVideo = () => {

  const [showAI, setShowAI] = useState(false);
  const { state } = useLocation();
  const videoDetails = state?.videoDetails;

  return (
    <div className="relative bg-gradient-to-br from-[#432F70] via-[#5E3B73] to-[#713770] text-white font-sans">
      {/* Background Blobs */}
      <div className="fixed top-[-6rem] left-[-6rem] w-96 h-96 bg-[#E95670] opacity-20 blur-3xl rounded-full animate-pulse z-0" />
      <div className="fixed bottom-[-6rem] right-[-6rem] w-96 h-96 bg-[#B34270] opacity-25 blur-2xl rounded-full animate-pulse z-0" />

      {/* Chatbot Icon - Fixed position */}
      <div className="fixed top-3 right-4 z-20">
        <img
          src="/chatbot.png"
          alt="AI Assistant"
          className="w-16 h-16 rounded-full border border-[#E95670] hover:scale-105 transition cursor-pointer"
          onClick={() => setShowAI(!showAI)}
          title="Ask AI Assistant"
        />
      </div>

      {/* Main Content */}
      <div className={`flex ${showAI ? 'fixed inset-0' : 'min-h-screen'}`}>
        {/* Left Section */}
        <div className={`${showAI ? 'h-screen overflow-y-auto w-[50%] ' : 'w-full min-h-screen'} bg-gradient-to-br from-[#432F70] via-[#5E3B73] to-[#713770] transition-all duration-300`}>
          <div className={`${showAI ? 'pt-2 pb-8 px-4' : 'max-w-3xl mx-auto pt-10 pb-8 px-4'}`}>
            {/* Video Box */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-md w-full h-[70vh] min-h-[400px]">
              <video className="w-full h-full rounded-lg object-cover" controls autoPlay muted>
                <source src={videoDetails.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Description Box */}
            <div className="w-full mt-4 bg-gradient-to-br from-[#331e57] to-[#592157] px-6 py-6 rounded-xl shadow">
              <h2 className="text-2xl font-semibold mb-2">{videoDetails.title}</h2>
              <p className="text-sm text-pink-100">
               {videoDetails.description}
              </p>
            </div>
          </div>
        </div>

        {/* Right Section: AI Panel */}
        {showAI && (
          <div className="hidden md:flex flex-col w-full max-w-lg bg-gradient-to-br from-[#3D1D53] to-[#5B2265] border-l border-white/10 h-screen overflow-y-auto">
            <div >
              <AI_Assistant />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FullVideo;