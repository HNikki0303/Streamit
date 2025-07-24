import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CommonA from "./CommonA";
import AI_Assistant from "./AI_Assistant";
import FormattedVideo from "./FormattedVideo";

const PublishVideo = () => {
  const [userDetails, setUserDetails] = useState({
    fullName: "",
    username: "",
    avatar: null,
    coverImage: null,
  });

  const [showAssistant, setShowAssistant] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [videoFile, setVideoFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("VITE_BACKEND/api/v1/user/currentUser", {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!videoFile) {
      setMessage("Video file is required.");
      return;
    }

    setLoading(true);

    const body = new FormData();
    body.append("title", formData.title);
    body.append("description", formData.description);
    body.append("video", videoFile);
    if (thumbnail) body.append("thumbnail", thumbnail);

    try {
      const res = await fetch("VITE_BACKEND/api/v1/video/publishAVideo", {
        method: "POST",
        body,
        credentials: "include",
      });

      const received = await res.json();

      if (received.status === 200 || received.statusCode === 200) {
        setMessage("Video has been published.");
        setId(received.data._id);
      } else {
        setMessage("Failed to publish video.");
      }
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Left Side - Video Upload */}
      <div className={`transition-all duration-500 ${showAssistant ? "w-[45%]" : "w-full"}`}>
        <CommonA
          userDetails={userDetails}
          showAssistant={showAssistant}
          setShowAssistant={setShowAssistant}
        >
          <div className="p-6 overflow-y-auto h-full">
            <h2 className="text-2xl font-bold text-white mb-4">Publish a New Video</h2>

            {message && <p className="text-blue-300 mb-2">{message}</p>}

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="text-white block mb-1">Upload Video *</label>
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => setVideoFile(e.target.files[0])}
                  required
                  className="w-full p-2 rounded bg-white/10 text-white"
                />
              </div>

              <div>
                <label className="text-white block mb-1">Upload Thumbnail</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setThumbnail(e.target.files[0])}
                  className="w-full p-2 rounded bg-white/10 text-white"
                />
              </div>

              <div>
                <label className="text-white block mb-1">Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full p-2 rounded bg-white/10 text-white"
                />
              </div>

              <div>
                <label className="text-white block mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full p-2 rounded bg-white/10 text-white"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 transition"
              >
                {loading ? "Publishing..." : "Publish"}
              </button>
            </form>

            {id && (
              <div className="mt-6">
                <FormattedVideo id={id} />
              </div>
            )}
          </div>
        </CommonA>
      </div>

      {/* Right Side - AI Assistant */}
      {showAssistant && (
        <div className="w-[55%] h-full overflow-y-auto bg-gradient-to-br from-[#3B1F4D] via-[#5E3B73] to-[#713770] text-white p-6">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 shadow-md h-full">
            <AI_Assistant
               userDetails={userDetails}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PublishVideo;
