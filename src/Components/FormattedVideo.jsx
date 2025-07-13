import React, { useEffect, useState } from 'react';

function FormattedVideo({ id }) {
  const [formattedVideo, setFormattedVideo] = useState({
    videoUrl: null,
    title: '',
    thumbnail: null,
    duration: '',
    owner: {
      username: '',
      avatar: '', // Assuming your backend sends an avatar URL
    },
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchVideoData = async () => {
      if (!id) {
        setError('Missing video ID.');
        return;
      }
      console.log(`we have got the video id ${id} `)

      setLoading(true);
      try {
        const res = await fetch(`http://localhost:8000/api/v1/video/videoLink/${id}`, {
          method: 'GET',
          credentials: 'include',
        });

        const response = await res.json();

        if (response.status === 200 || response.statusCode === 200) {
          const video = response.data;
          setFormattedVideo({
            videoUrl: video.videoFile,
            title: video.title,
            thumbnail: video.thumbnail,
            duration: video.duration,
            owner: {
              username: video.owner?.username || 'Unknown',
              avatar: video.owner?.avatar || '', // fallback to blank avatar
            },
          });
        } else {
          setError(response.message || 'Failed to fetch video');
        }
      } catch (err) {
        console.error(err);
        setError('An error occurred while fetching the video.');
      } finally {
        setLoading(false);
      }
    };

    fetchVideoData();
  }, [id]);

  if (loading) return <p className="text-gray-500">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!formattedVideo.videoUrl) return null;

  return (
    <div className="max-w-xl mx-auto mt-8 p-4 border rounded-lg shadow-md bg-white">
      <h2 className="text-xl font-semibold mb-2">{formattedVideo.title}</h2>

      <div className="relative mb-2">
        <video
          width="100%"
          controls
          poster={formattedVideo.thumbnail}
          className="rounded-lg w-full"
        >
          <source src={formattedVideo.videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="absolute bottom-2 right-2 flex items-center space-x-2 bg-white bg-opacity-80 px-2 py-1 rounded-full">
          {formattedVideo.owner.avatar && (
            <img
              src={formattedVideo.owner.avatar}
              alt="Avatar"
              className="w-6 h-6 rounded-full"
            />
          )}
          <span className="text-sm font-medium text-gray-800">
            {formattedVideo.owner.username}
          </span>
        </div>
      </div>

      <p className="text-sm text-gray-600">Duration: {formattedVideo.duration} seconds</p>
    </div>
  );
}

export default FormattedVideo;
