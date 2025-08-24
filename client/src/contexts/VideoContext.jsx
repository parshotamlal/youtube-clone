import React, { createContext, useContext, useState, useEffect } from 'react';
import { videos, channels } from '../data/dummyData';

const VideoContext = createContext();

export const useVideo = () => {
  const context = useContext(VideoContext);
  if (!context) {
    throw new Error('useVideo must be used within a VideoContext');
  }
  return context;
};

export const VideoProvider = ({ children }) => {
  const [allVideos, setAllVideos] = useState(videos);
  const [allChannels, setAllChannels] = useState(channels);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter videos based on category and search query
  const getFilteredVideos = () => {
    let filtered = allVideos;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(video => video.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(video =>
        video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  };

  // Get video by ID
  const getVideoById = (videoId) => {
    return allVideos.find(video => video.videoId === videoId);
  };

  // Get channel by ID
  const getChannelById = (channelId) => {
    return allChannels.find(channel => channel.channelId === channelId);
  };

  // Get videos by channel ID
  const getVideosByChannelId = (channelId) => {
    return allVideos.filter(video => video.channelId === channelId);
  };

  // Add comment to video
  const addComment = (videoId, comment) => {
    setAllVideos(prevVideos =>
      prevVideos.map(video => {
        if (video.videoId === videoId) {
          return {
            ...video,
            comments: [comment, ...video.comments]
          };
        }
        return video;
      })
    );
  };

  // Update comment
  const updateComment = (videoId, commentId, newText) => {
    setAllVideos(prevVideos =>
      prevVideos.map(video => {
        if (video.videoId === videoId) {
          return {
            ...video,
            comments: video.comments.map(comment =>
              comment.commentId === commentId
                ? { ...comment, text: newText }
                : comment
            )
          };
        }
        return video;
      })
    );
  };

  // Delete comment
  const deleteComment = (videoId, commentId) => {
    setAllVideos(prevVideos =>
      prevVideos.map(video => {
        if (video.videoId === videoId) {
          return {
            ...video,
            comments: video.comments.filter(comment => comment.commentId !== commentId)
          };
        }
        return video;
      })
    );
  };

  // Like video
  const likeVideo = (videoId) => {
    setAllVideos(prevVideos =>
      prevVideos.map(video => {
        if (video.videoId === videoId) {
          return {
            ...video,
            likes: video.likes + 1
          };
        }
        return video;
      })
    );
  };

  // Create new video
  const createVideo = (videoData) => {
    const newVideo = {
      videoId: `video${Date.now()}`,
      ...videoData,
      views: 0,
      likes: 0,
      dislikes: 0,
      uploadDate: new Date().toISOString().split('T')[0],
      comments: []
    };

    setAllVideos(prevVideos => [newVideo, ...prevVideos]);
    return newVideo;
  };

  // Update video
  const updateVideo = (videoId, updates) => {
    setAllVideos(prevVideos =>
      prevVideos.map(video =>
        video.videoId === videoId
          ? { ...video, ...updates }
          : video
      )
    );
  };

  // Delete video
  const deleteVideo = (videoId) => {
    setAllVideos(prevVideos =>
      prevVideos.filter(video => video.videoId !== videoId)
    );
  };

  const value = {
    allVideos,
    allChannels,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    getFilteredVideos,
    getVideoById,
    getChannelById,
    getVideosByChannelId,
    addComment,
    updateComment,
    deleteComment,
    likeVideo,
    createVideo,
    updateVideo,
    deleteVideo
  };

  return (
    <VideoContext.Provider value={value}>
      {children}
    </VideoContext.Provider>
  );
};