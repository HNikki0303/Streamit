import React, { useState } from "react";
import Login from './Login.jsx';
import Register from './Register.jsx';
import { useNavigate } from "react-router-dom";


const features = [
  {
    title: "Create Your Channel",
    description: "Register or Login to your channel , to create or watch content with smart and personalised AI assistant : Streamy. ",
    image: "/UserChannel.png",
  },
  {
    title: "Stream better with AI ",
    description: "Stream videos creatively , get ideas for content , script , insights and better video presentation through your personal AI assistant : Streamy.",
    image: "/VideoUpload.png",
  },
  {
    title: "Watch deeper with AI",
    description: "Ask questions and explore deeper along with watching the video content with integrated and personalised AI assistant : Streamy.",
    image: "/Watch.png",
  },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const [started, setStarted] = useState(false);//for the get started button
  const [login,showLogin]= useState(false);
  const [register,showRegister]= useState(false);

  const handleSuccessfulRegistration=()=>{
    navigate('/UserChannel');
  }

  return (
    <div className="min-h-screen overflow-x-hidden  font-sans bg-gradient-to-br from-[#432F70] via-[#5E3B73] to-[#713770] text-white">
      {started ? (
        // 🟪 Split view when "Get Started" is clicked
        <div className="flex h-screen">
          {/* Left Side: Top bar + Hero section */}
          <div className="w-1/2 flex flex-col">
            {/* Top Logo Bar */}
            <div className="w-full bg-[#e95671ce] bg-opacity-30 py-4 px-6">
              <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <img src="/Streamit.png" alt="Logo" className="w-9 h-9" />
                  <h1 className=" text-2xl font-bold tracking-wide">Streamit</h1>
                </div>
                <div className="pr-2">
                  <img
                  src="/chatbot.png"
                  alt="Chatbot"
                  className="w-15 h-15 rounded-full hover:scale-105 transition"
                  />
                </div>
              </div>
            </div>

            {/* Hero Section */}
            <section className="relative py-20 px-6 bg-gradient-to-br from-[#713770] to-[#432F70] h-full">
              <div className="absolute top-[-8rem] left-[-6rem] w-96 h-96 bg-[#E95670] opacity-20 blur-3xl rounded-full animate-pulse z-0" />
             <div className="absolute bottom-[-4rem] right-[-2rem] w-72 h-72 bg-[#B34270] opacity-25 blur-2xl rounded-full animate-pulse z-0" />
             <div className="absolute bottom-[-4rem] right-[-2rem] w-72 h-72 bg-[#B34270] opacity-25 blur-2xl rounded-full animate-pulse z-0" />
              <div className="relative z-10 max-w-5xl mx-auto text-center">
                <h2 className="text-5xl sm:text-6xl font-extrabold leading-tight mb-5">
                   Stream Smarter . Watch Deeper .
                </h2>
                <p className="text-lg text-pink-100 max-w-xl mx-auto mb-8">
                  Streaming or watching? Streamy's got you. Upload, explore, and learn — all in one smart platform: StreamIt.
                </p>
              </div>
            </section>
          </div>

          {/* Right Side: Login/Register UI */}
           <div className="w-1/2 bg-[#edebf1ec] text-gray-800 flex items-center justify-center px-8">
            {login ? (
              <Login onSuccess={handleSuccessfulRegistration} />
            ) : (
               register?(
                <
                Register onSuccess={handleSuccessfulRegistration}
               />):(
              
              <div className="text-center space-y-6">
                <h2 className="text-3xl font-bold text-[#E95670]">Welcome!</h2>
                <p className="text-sm">Log in to your account or register to start streaming</p>
                <div className="flex space-x-4 justify-center">
                  <button
                    className="bg-[#E95670] text-white px-4 py-2 rounded shadow hover:scale-104"
                    onClick={() => showLogin(true)} // Show login
                  >
                    Login
                  </button>
                  <button className="bg-[#713770] text-white px-4 py-2 rounded shadow hover:scale-104" 
                          onClick={()=> showRegister(true)}     
                  > 
                    Register
                  </button>
                </div>
              </div>)
            )}
          </div>
        </div>
      )  : (
        // 🟦 Default Full Page View
        <>
          {/* Top Logo Bar */}
          <div className="w-full bg-[#e95671ce] bg-opacity-30 py-4 px-6">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <img src="/Streamit.png
                " alt="Logo" className="w-18 h-17" />
                <h1 className=" text-2xl font-bold tracking-wide">StreamIt</h1>
              </div>
              <div className="pr-2">
                <img
                  src="/chatbot.png"
                  alt="Chatbot"
                  onClick={()=>{navigate('/AI')}}
                  className="fixed top-1 right-4 w-18 h-16 z-10 rounded-full border border-[#E95670] hover:scale-105 transition"
                />
              </div>
            </div>
          </div>

          {/* Hero / Intro Section */}
          <section className="relative py-20 px-6 bg-gradient-to-br from-[#713770] to-[#432F70]">
            <div className="absolute top-[-6rem] left-[-6rem] w-96 h-96 bg-[#E95670] opacity-20 blur-3xl rounded-full animate-pulse z-0" />
            <div className="absolute bottom-[-6rem] right-[-6rem] w-96 h-96 bg-[#B34270] opacity-25 blur-2xl rounded-full animate-pulse z-0" />
            <div className="relative z-10 max-w-5xl mx-auto text-center">
              <h2 className="text-4xl sm:text-6xl font-extrabold leading-tight mb-5">
                Stream smarter. Watch deeper.
              </h2>
              <p className="text-lg text-pink-100 max-w-xl mx-auto mb-8">
                Streaming or watching? Streamy's got you. Upload, explore, and learn — all in one smart platform : StreamIt. 
              </p>
              <button
                onClick={() => setStarted(true)}
                className="bg-[#E95670] hover:bg-[#c9435b] text-white px-8 py-3 rounded-full text-lg shadow-md transition hover:scale-105"
              >
                Get Started
              </button>
            </div>
          </section>

          {/* Features */}
          <section className="py-20 px-6 bg-gradient-to-br from-[#56366c] to-[#8b5677]">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition hover:-translate-y-1 hover:scale-105"
                  >
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className=" h-52 object-cover"
                    />
                    <div className="p-6">
                      <h4 className="text-xl font-semibold text-[#FFB4C6] mb-2">
                        {feature.title}
                      </h4>
                      <p className="text-sm text-gray-200">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="text-center py-6 text-sm bg-[#2c234f] text-gray-300">
            © 2025 StreamIt. All rights reserved.
          </footer>
        </>
      )}
    </div>
  );
}
