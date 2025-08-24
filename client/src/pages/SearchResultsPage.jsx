import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import CategoryFilter from '../components/Video/CategoryFilter';
import VideoGrid from '../components/Video/VideoGrid';
import { useVideo } from '../contexts/VideoContext';

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const { getFilteredVideos, setSearchQuery, searchQuery } = useVideo();

  useEffect(() => {
    if (query && query !== searchQuery) {
      setSearchQuery(query);
    }
  }, [query, searchQuery, setSearchQuery]);

  const videos = getFilteredVideos();

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {searchQuery ? `Search results for "${searchQuery}"` : 'Search Results'}
        </h1>
        <p className="text-gray-600">
          {videos.length} result{videos.length !== 1 ? 's' : ''} found
        </p>
      </div>
      
      <CategoryFilter />
      <VideoGrid videos={videos} />
    </div>
  );
};

export default SearchResultsPage;