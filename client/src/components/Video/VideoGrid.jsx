import React from 'react';
import VideoCard from './VideoCard';
import LoadingSpinner from '../UI/LoadingSpinner';

const VideoGrid = ({ videos, loading = false }) => {
  if (loading) {
    return <LoadingSpinner size="large" />;
  }

  if (!videos || videos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">No videos found.</p>
        <p className="text-gray-500 text-sm mt-2">Try adjusting your search or filter criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
      {videos.map((video) => (
        <VideoCard key={video.videoId} video={video} />
      ))}
    </div>
  );
};

export default VideoGrid;