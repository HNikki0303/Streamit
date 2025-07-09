import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function UploadVideo() { 
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [videoFile, setVideoFile] = useState(null);
  const [video,setVideo] = useState(
    {
      "videoFile":null,
      "duration":0
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    if (videoFile) formData.append("video", videoFile);

    try {
      const up = await fetch("http://localhost:8000/api/v1/video/upload", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (up.status === 200) {
        const data = await up.json();
        console.log("Video uploaded successfully:", data);

        //now just change the video or start formatting the video that has been uploaded 
        setVideo({
          videoFile: data.data.url,
          duration : data.data.duration,
        })

        console.log(video);

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
      <div>
        <video width="640" height="360" controls className="rounded-lg"  >
        <source src={video.videoFile} type="video/mp4" />
        Your browser does not support the video tag.
        </video>
        title:
        duration : {video.duration}
      </div>
    </>
  );
}

export default UploadVideo;
