import React, { useState ,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CommonA from "./CommonA";
import FormattedVideo from "./FormattedVideo";

const PublishVideo = () => {
  const [userDetails, setUserDetails] = useState({
      fullName: "",
      username: "",
      avatar: null,
      coverImage: null,
    });
  
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

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [id, setId] = useState(null);
  const navigate = useNavigate();
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!videoFile) {
      setMessage("Video file is required");
      return;
    }

    setLoading(true);

    const Body = new FormData();
    Body.append("title", formData.title);
    Body.append("description", formData.description);
    Body.append("video", videoFile);
    if (thumbnail) Body.append("thumbnail", thumbnail);

    try {
      const res = await fetch("http://localhost:8000/api/v1/video/publishAVideo", {
        method: "POST",
        body: Body,
        credentials: "include",
      });

      const received = await res.json();

      if (received.status === 200 || received.statusCode === 200) {
        setMessage("Video has been published on the server");
        setId(received.data._id);
      } else {
        setMessage("Sorry, we could not publish the video :(");
      }
    } catch (err) {
      console.log(err.message);
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CommonA userDetails = {userDetails}>
      <div className="overflow-y-auto max-h-[80vh] p-6">
        <h2 className="text-2xl font-bold text-white mb-6">Publish a New Video</h2>

        {message && (
          <p className="mb-4 text-md font-medium text-blue-300">{message}</p>
        )}

        <form onSubmit={handleFormSubmit} className="flex flex-col space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-white">Upload Video *</label>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => setVideoFile(e.target.files[0])}
              required
              className="block w-full text-sm text-white border border-gray-300 rounded bg-transparent p-2"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-white">Upload Thumbnail (optional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setThumbnail(e.target.files[0])}
              className="block w-full text-sm text-white border border-gray-300 rounded bg-transparent p-2"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-white">Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="block w-full text-sm text-white border border-gray-300 rounded bg-transparent p-2"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-white">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="block w-full text-sm text-white border border-gray-300 rounded bg-transparent p-2"
            />
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="submit"
              disabled={loading}
              className={`bg-pink-600 text-white px-6 py-2 rounded hover:bg-pink-700 transition duration-200 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Publishing..." : "Publish"}
            </button>
          </div>
        </form>

        {id && (
          <div className="mt-6">
            <FormattedVideo id={id} />
          </div>
        )}
      </div>
    </CommonA>
  );
};

export default PublishVideo;
