import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, Plus, Edit2, Trash2, Users } from 'lucide-react';
import { useVideo } from '../contexts/VideoContext';
import { useAuth } from '../contexts/AuthContext';
import VideoGrid from '../components/Video/VideoGrid';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const ChannelPage = () => {
  const { channelId } = useParams();
  const { getChannelById, getVideosByChannelId, createVideo, updateVideo, deleteVideo } = useVideo();
  const { user, isAuthenticated } = useAuth();
  const [channel, setChannel] = useState(null);
  const [videos, setVideos] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    thumbnailUrl: '',
    category: 'Education',
    duration: '10:00'
  });

  const isOwner = isAuthenticated && (
    channelId === 'my-channel' || 
    channel?.owner === user?.userId ||
    user?.channels?.includes(channelId)
  );

  useEffect(() => {
    if (channelId === 'my-channel' && isAuthenticated) {
      // Handle "my-channel" route
      const userChannelId = user.channels?.[0];
      if (userChannelId) {
        const channelData = getChannelById(userChannelId);
        setChannel(channelData);
        setVideos(getVideosByChannelId(userChannelId));
      } else {
        // Create a default channel for the user
        const defaultChannel = {
          channelId: `channel${Date.now()}`,
          channelName: `${user.username}'s Channel`,
          owner: user.userId,
          description: 'Welcome to my channel!',
          channelBanner: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1280&h=400&fit=crop',
          avatar: user.avatar,
          subscribers: 0,
          videos: [],
          verified: false
        };
        setChannel(defaultChannel);
        setVideos([]);
      }
    } else {
      const channelData = getChannelById(channelId);
      if (channelData) {
        setChannel(channelData);
        setVideos(getVideosByChannelId(channelId));
      }
    }
  }, [channelId, getChannelById, getVideosByChannelId, user, isAuthenticated]);

  const handleCreateVideo = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const videoData = {
      ...formData,
      channelId: channel.channelId,
      uploader: user.userId,
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      thumbnailUrl: formData.thumbnailUrl || 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=1280&h=720&fit=crop'
    };

    const newVideo = createVideo(videoData);
    setVideos(prev => [newVideo, ...prev]);
    setShowCreateForm(false);
    setFormData({
      title: '',
      description: '',
      thumbnailUrl: '',
      category: 'Education',
      duration: '10:00'
    });
  };

  const handleEditVideo = (video) => {
    setEditingVideo(video.videoId);
    setFormData({
      title: video.title,
      description: video.description,
      thumbnailUrl: video.thumbnailUrl,
      category: video.category,
      duration: video.duration
    });
    setShowCreateForm(true);
  };

  const handleUpdateVideo = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    updateVideo(editingVideo, formData);
    setVideos(prev => prev.map(video =>
      video.videoId === editingVideo
        ? { ...video, ...formData }
        : video
    ));
    
    setEditingVideo(null);
    setShowCreateForm(false);
    setFormData({
      title: '',
      description: '',
      thumbnailUrl: '',
      category: 'Education',
      duration: '10:00'
    });
  };

  const handleDeleteVideo = (videoId) => {
    if (window.confirm('Are you sure you want to delete this video?')) {
      deleteVideo(videoId);
      setVideos(prev => prev.filter(video => video.videoId !== videoId));
    }
  };

  const cancelForm = () => {
    setShowCreateForm(false);
    setEditingVideo(null);
    setFormData({
      title: '',
      description: '',
      thumbnailUrl: '',
      category: 'Education',
      duration: '10:00'
    });
  };

  if (!channel) {
    return <LoadingSpinner size="large" />;
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Channel Header */}
      <div className="mb-8">
        {/* Channel Banner */}
        <div className="w-full h-48 lg:h-64 bg-gray-200 rounded-xl overflow-hidden mb-6">
          <img
            src={channel.channelBanner}
            alt={`${channel.channelName} banner`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Channel Info */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex items-center space-x-6">
            <img
              src={channel.avatar}
              alt={channel.channelName}
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                  {channel.channelName}
                </h1>
                {channel.verified && <CheckCircle className="w-6 h-6 text-blue-600" />}
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>{channel.subscribers?.toLocaleString() || '0'} subscribers</span>
                </div>
                <span>•</span>
                <span>{videos.length} videos</span>
              </div>
              <p className="text-gray-700 mt-2 max-w-2xl">{channel.description}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {isOwner ? (
              <button
                onClick={() => setShowCreateForm(true)}
                className="flex items-center space-x-2 px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Upload Video</span>
              </button>
            ) : (
              <button className="px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors">
                Subscribe
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Create/Edit Video Form */}
      {showCreateForm && isOwner && (
        <div className="mb-8 p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {editingVideo ? 'Edit Video' : 'Upload New Video'}
          </h2>
          
          <form onSubmit={editingVideo ? handleUpdateVideo : handleCreateVideo} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter video title"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Enter video description"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Thumbnail URL
                </label>
                <input
                  type="url"
                  value={formData.thumbnailUrl}
                  onChange={(e) => setFormData(prev => ({ ...prev, thumbnailUrl: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://example.com/thumbnail.jpg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Education">Education</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Music">Music</option>
                  <option value="Gaming">Gaming</option>
                  <option value="Technology">Technology</option>
                  <option value="Food">Food</option>
                  <option value="Sports">Sports</option>
                  <option value="News">News</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Duration (mm:ss)
              </label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="10:30"
                pattern="^\d{1,2}:\d{2}$"
                required
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={cancelForm}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {editingVideo ? 'Update Video' : 'Upload Video'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Videos Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Videos ({videos.length})
          </h2>
        </div>

        {videos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            {videos.map((video) => (
              <div key={video.videoId} className="relative group">
                {/* Video Card with Actions */}
                <div className="group cursor-pointer">
                  <Link to={`/video/${video.videoId}`} className="block">
                    {/* Thumbnail */}
                    <div className="relative overflow-hidden rounded-xl bg-gray-200 aspect-video mb-3">
                      <img
                        src={video.thumbnailUrl}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded">
                        {video.duration}
                      </div>
                    </div>

                    {/* Video Info */}
                    <div className="space-y-2">
                      <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {video.title}
                      </h3>
                      <div className="text-sm text-gray-600">
                        <span>{video.views?.toLocaleString() || '0'} views</span>
                        <span className="mx-1">•</span>
                        <span>{new Date(video.uploadDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </Link>

                  {/* Action Buttons for Owner */}
                  {isOwner && (
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex space-x-1">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            handleEditVideo(video);
                          }}
                          className="p-2 bg-black bg-opacity-70 text-white rounded-lg hover:bg-opacity-90 transition-all"
                        >
                          <Edit2 className="w-3 h-3" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            handleDeleteVideo(video.videoId);
                          }}
                          className="p-2 bg-black bg-opacity-70 text-white rounded-lg hover:bg-red-600 transition-all"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              {isOwner ? 'You haven\'t uploaded any videos yet.' : 'This channel has no videos.'}
            </p>
            {isOwner && (
              <button
                onClick={() => setShowCreateForm(true)}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Upload Your First Video
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChannelPage;