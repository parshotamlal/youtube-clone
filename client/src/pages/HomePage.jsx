import React from 'react';
import CategoryFilter from '../components/Video/CategoryFilter';
import VideoGrid from '../components/Video/VideoGrid';
import { useVideo } from '../contexts/VideoContext';

const HomePage = () => {
  const { getFilteredVideos } = useVideo();
  const videos = getFilteredVideos();

  return (
    <div className="max-w-7xl mx-auto">
      <CategoryFilter />
      <VideoGrid videos={videos} />
    </div>
  );
};

export default HomePage;