import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';

const FormattedVideo = ({ id }) => {
  const navigate = useNavigate();

  
  const [formattedVideo, setFormattedVideo] = useState({
    videoUrl: null,
    title: '',
    description:'',
    thumbnail: null,
    duration: '',
    owner: {
      username: '',
      avatar: '',
    },
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchVideoData = async () => {
      if (!id) return setError('Missing video ID.');

      setLoading(true);
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND}/api/v1/video/videoLink/${id}`, {
          method: 'GET',
          credentials: 'include',
        });

        const response = await res.json();

        if (response.status === 200 || response.statusCode === 200) {
          const video = response.data;
          setFormattedVideo({
            videoUrl: video.videoFile,
            title: video.title,
            description:video.description,
            thumbnail: video.thumbnail,
            duration: video.duration,
            owner: {
              username: video.owner?.username || 'Unknown',
              avatar: video.owner?.avatar || '',
            },
          });
        } else {
          setError(response.message || 'Failed to fetch video');
        }
      } catch (err) {
        setError('An error occurred while fetching the video.');
      } finally {
        setLoading(false);
      }
    };

    fetchVideoData();
  }, [id]);

  if (loading) return <p className="text-gray-400">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!formattedVideo.videoUrl) return null;

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* VIDEO + OWNER INFO */}
      <div className="relative w-full h-[360px] rounded-xl overflow-hidden border-4 border-[#df5b7e] shadow-md bg-gradient-to-br from-purple-700 to-purple-900">
        <video
          src={formattedVideo.videoUrl}
          poster={formattedVideo.thumbnail}
          className="w-full h-full object-cover"
          controls
          onDoubleClick={() => {
            navigate('/FullVideo', { state: { videoDetails: formattedVideo } });
          }}

        />
        {/* Owner Username */}
        <div className="absolute bottom-4 left-4 bg-black/60 px-3 py-1 rounded-full flex items-center gap-2">
          {formattedVideo.owner.avatar && (
            <img
              src={formattedVideo.owner.avatar}
              alt="Avatar"
              className="w-6 h-6 rounded-full border border-white"
            />
          )}
          <span className="text-white text-sm font-medium">{formattedVideo.owner.username}</span>
        </div>
      </div>

      {/* TITLE BELOW VIDEO BOX (outside border) */}
      <div className="mt-2 px-2 py-1 text-white text-base font-semibold text-center bg-[#1a1a1a] rounded-md">
        {formattedVideo.title}
      </div>
    </div>
  );
};

export default FormattedVideo;

