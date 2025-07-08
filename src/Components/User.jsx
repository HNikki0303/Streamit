import React, { useState } from 'react';

function User() {
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
      <div>Hi, this is Nikita user</div>
      <div className="max-w-md mx-auto mt-8 p-4 border rounded shadow space-y-4">
      <h2 className="text-xl font-bold text-center">AI Assistant 🤖</h2>
      <textarea
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Ask me anything..."
        className="w-full border p-2 rounded"
        rows="4"
      />
      <button
        onClick={handleAskAI}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? 'Thinking...' : 'Ask Gemini'}
      </button>
      {response && (
        <div className="mt-4 p-3 bg-gray-100 rounded border text-sm whitespace-pre-wrap">
          <strong>AI:</strong> {response}
        </div>
      )}
    </div>
    </>
    
  );
}

export default User;
