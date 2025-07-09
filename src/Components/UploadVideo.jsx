import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function UploadVideo() { 
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [videoFile, setVideoFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    if (videoFile) formData.append("video", videoFile);

    try {
      const up = await fetch("http://localhost:8000/api/v1/video/upload", {
        method: "POST",
        body: formData,
      });

      if (up.status === 200) {
        const data = await up.json();
        console.log("Video uploaded successfully:", data);
        alert("Upload successful!");
      } else {
        const errorData = await up.json();
        alert(errorData.message || "Upload failed.");
      }
    } catch (err) {
      console.error("Error uploading video:", err);
      alert("An error occurred while uploading the video. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="video/*"
          onChange={(e) => setVideoFile(e.target.files[0])}
          required
        />
        <button
          type="submit"
          className="hover:scale-105 bg-red-500 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
      <div>Hi, this is Nikita user , click the button below to use  AI_Assistance</div>
      <button onClick ={()=> navigate('/AI')}>Click me</button>
    </>
  );
}

export default UploadVideo;
