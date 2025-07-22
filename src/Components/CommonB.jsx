import React , {useState} from "react";
import { FiSearch } from "react-icons/fi";
import PaginatedVideoFeed from './PaginatedVideoFeed';

const CommonB = () => {
  const [search,setSearch ] = useState("");
  const [searchButton,setSearchButton] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#432F70] via-[#5E3B73] to-[#713770] text-white font-sans relative overflow-hidden">
      
      {/* AI Assistant Icon */}
      <div className="absolute top-3 right-4 z-25">
        <img
          src="/chatbot-avatar.png"
          alt="AI Assistant"
          className="w-12 h-12 rounded-full border border-[#E95670] hover:scale-105 transition"
          title="Ask AI Assistant"
        />
      </div>

      {/* Search Bar Container - shifted away from assistant */}
      <div className="w-full px-6 py-2 bg-[#e95671ce] bg-opacity-30 z-10 flex h-18">
        <div className="w-full max-w-4xl flex items-center space-x-2 mr-auto">
          <input
            type="text"
            placeholder="Search videos..."
            className="flex-1 px-5 py-[0.6rem] rounded-full border bg-[#ed889ace] border-l-[#d7a8b2ce]
            bg-white/10 backdrop-blur-sm text-white text-base placeholder-white/70 
            shadow-md transition-all duration-300 focus:outline-none 
            focus:ring-2 focus:ring-[#d88a9a] hover:bg-white/20"
            value={search}
            onChange={(e)=>{
              setSearch(e.target.value)
            }}
          />
          <button 
          className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition"
          onClick = {()=>{
            setSearchButton(true);
            setTimeout(() => setSearchButton(true), 0);
          }}
          >
            <FiSearch size={20} />
          </button>
        </div>
      </div>
          {searchButton}
      {/* Search Results Area */}
      <div >
        { searchButton && 
        <PaginatedVideoFeed fetchUrl={`http://localhost:8000/api/v1/video/searchTitle?title=${encodeURIComponent(search)}&`} />
        }
      </div>
    </div>
  );
};

export default CommonB;
