import React, { useEffect, useState, useRef, useCallback } from 'react';
import FormattedVideo from './FormattedVideo';

const PaginatedVideoFeed = ({ fetchUrl }) => {
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
          setPage(prev => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    const fetchPaginatedVideos = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${fetchUrl}?page=${page}&limit=6`, {
          credentials: 'include', // needed if using cookies for auth
        });
        const response = await res.json();

        if (res.ok && response.success) {
          const newVideoIds = response.data.videos.map(v => v._id);
          if (newVideoIds.length === 0) {
            setHasMore(false);
          } else {
            setVideoIds(prev => [...prev, ...newVideoIds]);
            setHasMore(response.data.currentPage < response.data.totalPages);
          }
        } else {
          console.error(" Failed to fetch videos:", response.message);
          setHasMore(false);
        }
      } catch (err) {
        console.error(" Fetch error:", err);
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    };

    fetchPaginatedVideos();
  }, [page, fetchUrl]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#331e57] to-[#592157] px-4 py-12 overflow-hidden">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-20 gap-x-6">
        {videoIds.map((id, index) => {
          if (videoIds.length === index + 1) {
            return (
              <div key={id} ref={loadMoreRef}>
                <FormattedVideo id={id} />
              </div>
            );
          }
          return (
            <div key={id}>
              <FormattedVideo id={id} />
            </div>
          );
        })}
      </div>

      {loading && (
        <p className="text-center text-pink-300 text-sm mt-8">Loading more videos...</p>
      )}
      {!hasMore && (
        <p className="text-center text-gray-400 mt-10"> You’ve reached the end!</p>
      )}
    </div>
  );
};

export default PaginatedVideoFeed;
