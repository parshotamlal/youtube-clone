import React, { useState } from "react";
import { Upload, FileVideo, Image } from "lucide-react";

const UploadPage = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) setVideoFile(file);
  };

  const handleThumbnailUpload = (e) => {
    const file = e.target.files[0];
    if (file) setThumbnailFile(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!videoFile || !title) {
      alert("Please upload a video and enter a title.");
      return;
    }

    // ⚡ Yaha tum API call/Firebase upload ka logic laga sakte ho
    console.log("Uploading:", { videoFile, thumbnailFile, title, description });
    alert("Video uploaded successfully (mock)");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-start py-10">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Upload className="w-6 h-6 text-blue-600" />
          Upload Video
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Video Upload */}
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition">
            <input
              type="file"
              accept="video/*"
              onChange={handleVideoUpload}
              className="hidden"
              id="video-upload"
            />
            <label
              htmlFor="video-upload"
              className="flex flex-col items-center cursor-pointer"
            >
              {videoFile ? (
                <video
                  src={URL.createObjectURL(videoFile)}
                  controls
                  className="w-full rounded-lg"
                />
              ) : (
                <>
                  <FileVideo className="w-10 h-10 text-gray-500 mb-2" />
                  <span className="text-gray-600">
                    Click to upload video (mp4, mov...)
                  </span>
                </>
              )}
            </label>
          </div>

          {/* Thumbnail Upload */}
          <div>
            <label className="block font-medium mb-2">Thumbnail</label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition">
              <input
                type="file"
                accept="image/*"
                onChange={handleThumbnailUpload}
                className="hidden"
                id="thumbnail-upload"
              />
              <label
                htmlFor="thumbnail-upload"
                className="flex flex-col items-center cursor-pointer"
              >
                {thumbnailFile ? (
                  <img
                    src={URL.createObjectURL(thumbnailFile)}
                    alt="Thumbnail Preview"
                    className="w-40 h-24 object-cover rounded-lg"
                  />
                ) : (
                  <>
                    <Image className="w-8 h-8 text-gray-500 mb-1" />
                    <span className="text-gray-600">
                      Upload a custom thumbnail
                    </span>
                  </>
                )}
              </label>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block font-medium mb-2">Title *</label>
            <input
              type="text"
              placeholder="Enter video title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium mb-2">Description</label>
            <textarea
              placeholder="Enter video description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
          >
            Upload Video
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadPage;
