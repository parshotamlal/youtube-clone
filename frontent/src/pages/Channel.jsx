import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChannel, fetchChannelVideos, subscribeToChannel, unsubscribeFromChannel } from '../redux/channelSlice';
import { useAuth } from '../hooks/useAuth';
import ChannelInfo from '../components/ChannelInfo';
import VideoCard, { VideoCardSkeleton } from '../components/VideoCard';
import Loader from '../components/Loader';

const Channel = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useAuth();
  const { currentChannel, channelVideos, isLoading, error } = useSelector((state) => state.channels);
  const [activeTab, setActiveTab] = useState('videos');
  const [subscriptionLoading, setSubscriptionLoading] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchChannel(id));
      dispatch(fetchChannelVideos(id));
    }
  }, [dispatch, id]);

  const handleSubscribe = async (channelId) => {
    setSubscriptionLoading(true);
    try {
      await dispatch(subscribeToChannel(channelId)).unwrap();
    } catch (error) {
      console.error('Subscription failed:', error);
    } finally {
      setSubscriptionLoading(false);
    }
  };

  const handleUnsubscribe = async (channelId) => {
    setSubscriptionLoading(true);
    try {
      await dispatch(unsubscribeFromChannel(channelId)).unwrap();
    } catch (error) {
      console.error('Unsubscription failed:', error);
    } finally {
      setSubscriptionLoading(false);
    }
  };

  if (isLoading && !currentChannel) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-48 bg-gray-200 rounded-lg mb-6" />
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-20 h-20 bg-gray-200 rounded-full" />
              <div className="flex-1">
                <div className="h-6 bg-gray-200 rounded w-1/3 mb-2" />
                <div className="h-4 bg-gray-200 rounded w-1/4" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }, (_, index) => (
                <VideoCardSkeleton key={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Channel not found</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link
            to="/"
            className="btn-hover bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  const isOwner = user && user.id === currentChannel?.id;
  const tabs = [
    { id: 'videos', name: 'Videos' },
    { id: 'playlists', name: 'Playlists' },
    { id: 'community', name: 'Community' },
    { id: 'channels', name: 'Channels' },
    { id: 'about', name: 'About' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Channel Header */}
        {currentChannel && (
          <div className="mb-8">
            <ChannelInfo
              channel={currentChannel}
              onSubscribe={handleSubscribe}
              onUnsubscribe={handleUnsubscribe}
              loading={subscriptionLoading}
            />
          </div>
        )}

        {/* Channel Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    py-4 px-1 border-b-2 font-medium text-sm transition-colors
                    ${activeTab === tab.id
                      ? 'border-youtube-red text-youtube-red'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }
                  `}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          {activeTab === 'videos' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Videos</h2>
                {isOwner && (
                  <Link
                    to="/upload"
                    className="btn-hover bg-youtube-red text-white px-4 py-2 rounded-full hover:bg-red-600 transition-colors"
                  >
                    Upload Video
                  </Link>
                )}
              </div>
              
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {Array.from({ length: 8 }, (_, index) => (
                    <VideoCardSkeleton key={index} />
                  ))}
                </div>
              ) : channelVideos.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {channelVideos.map((video) => (
                    <VideoCard key={video.id} video={video} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-6xl mb-4">📺</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">No videos yet</h3>
                  <p className="text-gray-600 mb-4">
                    {isOwner
                      ? 'Upload your first video to get started'
                      : 'This channel hasn\'t uploaded any videos yet'
                    }
                  </p>
                  {isOwner && (
                    <Link
                      to="/upload"
                      className="btn-hover bg-youtube-red text-white px-6 py-2 rounded-full hover:bg-red-600 transition-colors"
                    >
                      Upload Video
                    </Link>
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === 'playlists' && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📋</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No playlists</h3>
              <p className="text-gray-600">This channel hasn't created any playlists yet.</p>
            </div>
          )}

          {activeTab === 'community' && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">💬</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No community posts</h3>
              <p className="text-gray-600">This channel hasn't posted to the community tab yet.</p>
            </div>
          )}

          {activeTab === 'channels' && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📺</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No featured channels</h3>
              <p className="text-gray-600">This channel hasn't featured any other channels yet.</p>
            </div>
          )}

          {activeTab === 'about' && currentChannel && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                <p className="text-gray-700 whitespace-pre-wrap">
                  {currentChannel.description || 'No description available.'}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-200">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Stats</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>Joined {new Date(currentChannel.createdAt).toLocaleDateString()}</p>
                    <p>{currentChannel.videoCount || 0} videos</p>
                    <p>{currentChannel.totalViews || 0} total views</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Links</h4>
                  <div className="space-y-2">
                    {currentChannel.website && (
                      <a
                        href={currentChannel.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-sm block"
                      >
                        Website
                      </a>
                    )}
                    {currentChannel.social && (
                      <a
                        href={currentChannel.social}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-sm block"
                      >
                        Social Media
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Channel;