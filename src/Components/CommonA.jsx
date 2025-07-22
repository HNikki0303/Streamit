import React from 'react';

const CommonA = ({ children, userDetails, showAssistant , setShowAssistant }) => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#432F70] via-[#5E3B73] to-[#713770] text-white font-sans overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-[-6rem] left-[-6rem] w-96 h-96 bg-[#E95670] opacity-20 blur-3xl rounded-full animate-pulse z-0" />
      <div className="absolute bottom-[-6rem] right-[-6rem] w-96 h-96 bg-[#B34270] opacity-25 blur-2xl rounded-full animate-pulse z-0" />

      {/* Cover Section */}
      <div
        className="relative h-32 bg-cover bg-center z-10 border-b-2 border-pink-400"
        style={{ backgroundImage: `url(${userDetails.coverImage})` }}
      >
        <div className="absolute top-3 right-4 z-20">
          <img
            onClick={() => setShowAssistant(!showAssistant)}
            src="/chatbot.png"
            alt="AI Assistant"
            className="w-20 h-20 rounded-full border border-[#E95670] hover:scale-105 transition cursor-pointer"
            title="Ask AI Assistant"
          />
        </div>
      </div>

      {/* Avatar and Name */}
      <div className="relative px-6 sm:px-10 -mt-12 flex items-end space-x-4 z-20">
        <img
          src={userDetails.avatar}
          alt="User Avatar"
          className="w-20 h-20 rounded-full border-4 border-white object-cover shadow-lg bg-white"
        />
        <div className="pb-2">
          <h2 className="text-xl sm:text-2xl font-bold">{userDetails.username}</h2>
          <p className="text-sm text-pink-200">{userDetails.fullName}</p>
        </div>
      </div>
         {/* /*this is now more usesful*/ }
      {/* Centered Form Box */}
      <div className="flex justify-center items-start overflow-y-auto h-[calc(100vh-12rem)] px-4 py-6 z-10 relative">
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-md w-full max-w-xl min-h-[300px]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default CommonA;
