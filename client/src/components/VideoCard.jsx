import { Link } from "react-router-dom";

function VideoCard({ v }) {
  return (
    <Link
      to={`/video/${v._id}`}
      className="block group hover:scale-[1.02] transition-transform duration-200"
    >
      {/* Thumbnail */}
      <div className="relative">
        <img
          className="w-full aspect-video object-cover rounded-xl"
          src={v.thumbnailUrl}
          alt={v.title}
        />
        {/* Duration badge */}
        {v.duration && (
          <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded">
            {v.duration}
          </span>
        )}
      </div>

      {/* Video Info */}
      <div className="mt-3 flex gap-3">
        {/* Channel Avatar */}
        <img
          src={v.channel?.avatarUrl || "https://via.placeholder.com/40"}
          alt={v.channel?.channelName || "Channel"}
          className="w-10 h-10 rounded-full object-cover"
        />

        {/* Title & Meta */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm sm:text-base line-clamp-2 text-white group-hover:text-red-500">
            {v.title}
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">
            {v.channel?.channelName || "Unknown Channel"}
          </p>
          <p className="text-xs text-gray-500">
            {v.views} views • {v.uploadedAt || "Recently"}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default VideoCard;
