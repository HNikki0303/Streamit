import React, { useEffect, useState, useRef, useCallback } from 'react';
import FormattedVideo from './FormattedVideo';

const PaginatedVideoFeed = () => {
  const [videoIds, setVideoIds] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const observer = useRef();

  const loadMoreRef = useCallback(
    node => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          setPage(prevPage => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const fetchVideoIds = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8000/api/v1/video/paginated?page=${page}&limit=6`);
      const data = await res.json();

      if (res.ok && data?.data?.length > 0) {
        setVideoIds(prev => [...prev, ...data.data]);
        if (data.data.length < 6) {
          setHasMore(false);
        }
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error('Error fetching paginated videos:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  const fetchPaginatedVideos = async () => {
    console.log(`📡 Fetching videos for page ${page}`);
    try {
      const res = await fetch(`http://localhost:8000/api/v1/video/paginated?page=${page}&limit=6`);
      const response = await res.json();

      console.log("🧾 Raw paginated response:", response);

      if (res.ok && response.success) {
        const newVideoIds = response.data.videos.map(v => v._id);
        console.log(`✅ Video IDs fetched for page ${page}:`, newVideoIds);

        if (newVideoIds.length === 0) {
          console.log("🔚 No more video IDs to fetch.");
          setHasMore(false);
        } else {
          setVideoIds(prev => [...prev, ...newVideoIds]);
          setHasMore(response.data.currentPage < response.data.totalPages);
        }
      } else {
        console.error("❌ Failed to fetch paginated videos:", response.message);
        setHasMore(false);
      }
    } catch (err) {
      console.error("💥 Error while fetching paginated videos:", err);
      setHasMore(false);
    }
  };

  fetchPaginatedVideos();
}, [page]);


  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {videoIds.map((id, index) => {
          if (videoIds.length === index + 1) {
            return (
              <div key={id} ref={loadMoreRef}>
                <FormattedVideo id={id} />
              </div>
            );
          } else {
            return (
              <div key={id}>
                <FormattedVideo id={id} />
              </div>
            );
          }
        })}
      </div>

      {loading && (
        <p className="text-center text-gray-500 py-4">Loading more videos...</p>
      )}
      {!hasMore && (
        <p className="text-center text-gray-400 py-4">You’ve reached the end!</p>
      )}
    </div>
  );
};

export default PaginatedVideoFeed;
