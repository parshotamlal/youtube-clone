import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { uploadVideo } from '../redux/videoSlice';
import { useAuth } from '../hooks/useAuth';
import Loader, { ButtonLoader } from '../components/Loader';

const Upload = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuth();
  const { isLoading, uploadProgress, error } = useSelector((state) => state.videos);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'entertainment',
    thumbnail: null,
    videoFile: null,
  });
  
  const [previews, setPreviews] = useState({
    thumbnail: null,
    video: null,
  });

  const categories = [
    'entertainment', 'music', 'gaming', 'news', 'sports', 
    'education', 'technology', 'travel', 'lifestyle', 'comedy'
  ];

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    
    if (!file) return;

    // Validate file type
    if (name === 'videoFile' && !file.type.startsWith('video/')) {
      alert('Please select a valid video file');
      return;
    }
    
    if (name === 'thumbnail' && !file.type.startsWith('image/')) {
      alert('Please select a valid image file');
      return;
    }

    // Update form data
    setFormData(prev => ({
      ...prev,
      [name]: file
    }));

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviews(prev => ({
        ...prev,
        [name === 'videoFile' ? 'video' : 'thumbnail']: e.target.result
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.videoFile) {
      alert('Title and video file are required');
      return;
    }

    const uploadData = new FormData();
    uploadData.append('title', formData.title.trim());
    uploadData.append('description', formData.description.trim());
    uploadData.append('category', formData.category);
    uploadData.append('video', formData.videoFile);
    
    if (formData.thumbnail) {
      uploadData.append('thumbnail', formData.thumbnail);
    }

    try {
      const result = await dispatch(uploadVideo(uploadData)).unwrap();
      navigate(`/watch/${result.id}`);
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  if (!isAuthenticated) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Upload Video</h1>
            <p className="text-gray-600">Share your content with the world</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Video File Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Video File *
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                {previews.video ? (
                  <div className="space-y-4">
                    <video
                      src={previews.video}
                      controls
                      className="max-w-full h-48 mx-auto rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setFormData(prev => ({ ...prev, videoFile: null }));
                        setPreviews(prev => ({ ...prev, video: null }));
                      }}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Remove Video
                    </button>
                  </div>
                ) : (
                  <div>
                    <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p className="text-gray-600 mb-2">Click to upload or drag and drop</p>
                    <p className="text-sm text-gray-500">MP4, WebM, AVI (max 100MB)</p>
                    <input
                      type="file"
                      name="videoFile"
                      accept="video/*"
                      onChange={handleFileChange}
                      className="hidden"
                      id="video-upload"
                    />
                    <label
                      htmlFor="video-upload"
                      className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
                    >
                      Select Video
                    </label>
                  </div>
                )}
              </div>
            </div>

            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter video title"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Tell viewers about your video"
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Thumbnail */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Thumbnail (Optional)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
                {previews.thumbnail ? (
                  <div className="space-y-4">
                    <img
                      src={previews.thumbnail}
                      alt="Thumbnail preview"
                      className="max-w-full h-32 mx-auto rounded-lg object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setFormData(prev => ({ ...prev, thumbnail: null }));
                        setPreviews(prev => ({ ...prev, thumbnail: null }));
                      }}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Remove Thumbnail
                    </button>
                  </div>
                ) : (
                  <div>
                    <svg className="mx-auto h-8 w-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-gray-600 text-sm mb-2">Upload a custom thumbnail</p>
                    <input
                      type="file"
                      name="thumbnail"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                      id="thumbnail-upload"
                    />
                    <label
                      htmlFor="thumbnail-upload"
                      className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer text-sm"
                    >
                      Select Image
                    </label>
                  </div>
                )}
              </div>
            </div>

            {/* Error Display */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {/* Upload Progress */}
            {isLoading && (
              <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg">
                <div className="flex items-center space-x-3">
                  <ButtonLoader />
                  <span>Uploading video... {uploadProgress > 0 && `${uploadProgress}%`}</span>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading || !formData.title.trim() || !formData.videoFile}
                className="btn-hover bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {isLoading && <ButtonLoader />}
                <span>{isLoading ? 'Uploading...' : 'Upload Video'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Upload;