import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ThumbsUp, ThumbsDown, Share, Download, Flag, CheckCircle, Edit2, Trash2 } from 'lucide-react';
import { useVideo } from '../contexts/VideoContext';
import { useAuth } from '../contexts/AuthContext';
import VideoGrid from '../components/Video/VideoGrid';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const VideoPlayerPage = () => {
  const { videoId } = useParams();
  const { getVideoById, getChannelById, addComment, updateComment, deleteComment, likeVideo, allVideos } = useVideo();
  const { user, isAuthenticated } = useAuth();
  const [video, setVideo] = useState(null);
  const [channel, setChannel] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [editingComment, setEditingComment] = useState(null);
  const [editCommentText, setEditCommentText] = useState('');
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const videoData = getVideoById(videoId);
    if (videoData) {
      setVideo(videoData);
      const channelData = getChannelById(videoData.channelId);
      setChannel(channelData);
    }
  }, [videoId, getVideoById, getChannelById]);

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment.trim() || !isAuthenticated) return;

    const comment = {
      commentId: `comment${Date.now()}`,
      userId: user.userId,
      username: user.username,
      avatar: user.avatar,
      text: newComment.trim(),
      timestamp: new Date().toISOString(),
      likes: 0
    };

    addComment(videoId, comment);
    setNewComment('');
    
    // Update local video state
    setVideo(prev => ({
      ...prev,
      comments: [comment, ...prev.comments]
    }));
  };

  const handleEditComment = (commentId, text) => {
    setEditingComment(commentId);
    setEditCommentText(text);
  };

  const handleUpdateComment = () => {
    if (!editCommentText.trim()) return;

    updateComment(videoId, editingComment, editCommentText.trim());
    setEditingComment(null);
    setEditCommentText('');
    
    // Update local video state
    setVideo(prev => ({
      ...prev,
      comments: prev.comments.map(comment =>
        comment.commentId === editingComment
          ? { ...comment, text: editCommentText.trim() }
          : comment
      )
    }));
  };

  const handleDeleteComment = (commentId) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      deleteComment(videoId, commentId);
      
      // Update local video state
      setVideo(prev => ({
        ...prev,
        comments: prev.comments.filter(comment => comment.commentId !== commentId)
      }));
    }
  };

  const handleLike = () => {
    if (!isAuthenticated) return;
    likeVideo(videoId);
    setLiked(true);
    
    // Update local video state
    setVideo(prev => ({
      ...prev,
      likes: prev.likes + 1
    }));
  };

  const formatViews = (views) => {
    return views?.toLocaleString() || '0';
  };

  const relatedVideos = allVideos
    .filter(v => v.videoId !== videoId && v.channelId === video?.channelId)
    .slice(0, 8);

  if (!video || !channel) {
    return <LoadingSpinner size="large" />;
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Video Section */}
        <div className="lg:col-span-2">
          {/* Video Player */}
          <div className="aspect-video bg-black rounded-lg overflow-hidden mb-4">
            <video
              src={video.videoUrl}
              controls
              className="w-full h-full"
              poster={video.thumbnailUrl}
            >
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Video Info */}
          <div className="space-y-4">
            <h1 className="text-xl lg:text-2xl font-bold text-gray-900">
              {video.title}
            </h1>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span>{formatViews(video.views)} views</span>
                <span>•</span>
                <span>{new Date(video.uploadDate).toLocaleDateString()}</span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={handleLike}
                  disabled={!isAuthenticated}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all ${
                    liked
                      ? 'bg-blue-100 text-blue-600'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  } ${!isAuthenticated ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span>{video.likes}</span>
                </button>

                <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">
                  <ThumbsDown className="w-4 h-4" />
                  <span>{video.dislikes}</span>
                </button>

                <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">
                  <Share className="w-4 h-4" />
                  <span>Share</span>
                </button>

                <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">
                  <Download className="w-4 h-4" />
                  <span>Save</span>
                </button>
              </div>
            </div>

            {/* Channel Info */}
            <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <img
                  src={channel.avatar}
                  alt={channel.channelName}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-gray-900">{channel.channelName}</h3>
                    {channel.verified && <CheckCircle className="w-4 h-4 text-gray-600" />}
                  </div>
                  <p className="text-sm text-gray-600">
                    {channel.subscribers?.toLocaleString()} subscribers
                  </p>
                </div>
              </div>
              <button className="px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors">
                Subscribe
              </button>
            </div>

            {/* Video Description */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-700 whitespace-pre-wrap">{video.description}</p>
            </div>

            {/* Comments Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Comments ({video.comments?.length || 0})
              </h3>

              {/* Add Comment Form */}
              {isAuthenticated ? (
                <form onSubmit={handleAddComment} className="space-y-4">
                  <div className="flex space-x-4">
                    <img
                      src={user.avatar}
                      alt={user.username}
                      className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="flex-1">
                      <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Add a comment..."
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        rows="3"
                      />
                      <div className="flex justify-end space-x-2 mt-2">
                        <button
                          type="button"
                          onClick={() => setNewComment('')}
                          className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={!newComment.trim()}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          Comment
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              ) : (
                <p className="text-gray-600">
                  <Link to="/auth" className="text-blue-600 hover:underline">
                    Sign in
                  </Link>{' '}
                  to add a comment.
                </p>
              )}

              {/* Comments List */}
              <div className="space-y-6">
                {video.comments?.map((comment) => (
                  <div key={comment.commentId} className="flex space-x-4">
                    <img
                      src={comment.avatar}
                      alt={comment.username}
                      className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-semibold text-sm text-gray-900">
                          {comment.username}
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(comment.timestamp).toLocaleDateString()}
                        </span>
                        {isAuthenticated && user.userId === comment.userId && (
                          <div className="flex items-center space-x-1 ml-auto">
                            <button
                              onClick={() => handleEditComment(comment.commentId, comment.text)}
                              className="p-1 text-gray-500 hover:text-blue-600 transition-colors"
                            >
                              <Edit2 className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => handleDeleteComment(comment.commentId)}
                              className="p-1 text-gray-500 hover:text-red-600 transition-colors"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </div>

                      {editingComment === comment.commentId ? (
                        <div className="space-y-2">
                          <textarea
                            value={editCommentText}
                            onChange={(e) => setEditCommentText(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm"
                            rows="2"
                          />
                          <div className="flex space-x-2">
                            <button
                              onClick={handleUpdateComment}
                              className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditingComment(null)}
                              className="px-3 py-1 text-gray-600 text-sm hover:text-gray-800 transition-colors"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-gray-700 text-sm">{comment.text}</p>
                      )}

                      <div className="flex items-center space-x-4 mt-2">
                        <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-600 transition-colors">
                          <ThumbsUp className="w-3 h-3" />
                          <span className="text-xs">{comment.likes || 0}</span>
                        </button>
                        <button className="text-xs text-gray-500 hover:text-gray-700 transition-colors">
                          Reply
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related Videos Sidebar */}
        <div className="lg:col-span-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">More from this channel</h3>
          {relatedVideos.length > 0 ? (
            <div className="space-y-4">
              {relatedVideos.map((relatedVideo) => (
                <Link
                  key={relatedVideo.videoId}
                  to={`/video/${relatedVideo.videoId}`}
                  className="flex space-x-3 group"
                >
                  <div className="flex-shrink-0 w-40 aspect-video bg-gray-200 rounded-lg overflow-hidden">
                    <img
                      src={relatedVideo.thumbnailUrl}
                      alt={relatedVideo.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {relatedVideo.title}
                    </h4>
                    <p className="text-xs text-gray-600 mt-1">{channel.channelName}</p>
                    <p className="text-xs text-gray-600">
                      {formatViews(relatedVideo.views)} views
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No other videos from this channel.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoPlayerPage;