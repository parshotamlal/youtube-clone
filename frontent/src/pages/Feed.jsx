import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVideos } from '../redux/videoSlice';
import VideoCard, { VideoCardSkeleton } from '../components/VideoCard';
import Loader from '../components/Loader';

const Feed = () => {
  const dispatch = useDispatch();
  const { videos, isLoading, error } = useSelector((state) => state.videos);
  const [category, setCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'music', name: 'Music' },
    { id: 'gaming', name: 'Gaming' },
    { id: 'news', name: 'News' },
    { id: 'sports', name: 'Sports' },
    { id: 'entertainment', name: 'Entertainment' },
    { id: 'education', name: 'Education' },
    { id: 'technology', name: 'Technology' },
  ];

  useEffect(() => {
    dispatch(fetchVideos({ category: category !== 'all' ? category : null }));
  }, [dispatch, category]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Something went wrong</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => dispatch(fetchVideos())}
            className="btn-hover bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Category Filter */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex space-x-3 overflow-x-auto scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={`
                  px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors
                  ${category === cat.id
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }
                `}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Video Grid */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 12 }, (_, index) => (
              <VideoCardSkeleton key={index} />
            ))}
          </div>
        ) : videos && videos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {videos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📺</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">No videos found</h2>
            <p className="text-gray-600">
              {category !== 'all'
                ? `No videos found in the ${category} category.`
                : 'No videos available at the moment.'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Feed;