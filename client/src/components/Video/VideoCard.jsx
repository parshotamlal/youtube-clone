import React from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { CheckCircle } from 'lucide-react';
import { useVideo } from '../../contexts/VideoContext';

const VideoCard = ({ video }) => {
  const { getChannelById } = useVideo();
  const channel = getChannelById(video.channelId);

  const formatViews = (views) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views?.toString() || '0';
  };

  const formatUploadDate = (dateString) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch {
      return 'Unknown';
    }
  };

  return (
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
        <div className="flex space-x-3">
          {/* Channel Avatar */}
          <div className="flex-shrink-0">
            <img
              src={channel?.avatar || 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=40'}
              alt={channel?.channelName}
              className="w-9 h-9 rounded-full object-cover"
            />
          </div>

          {/* Video Details */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 group-hover:text-blue-600 transition-colors">
              {video.title}
            </h3>
            
            <div className="flex items-center space-x-1 mt-1">
              <span className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                {channel?.channelName}
              </span>
              {channel?.verified && (
                <CheckCircle className="w-3 h-3 text-gray-600" />
              )}
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-gray-600 mt-1">
              <span>{formatViews(video.views)} views</span>
              <span>•</span>
              <span>{formatUploadDate(video.uploadDate)}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default VideoCard;