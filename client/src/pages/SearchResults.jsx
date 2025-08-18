import { useEffect, useState, useRef, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../api/axios";
import VideoCard from "../components/VideoCard";
import { Loader2 } from "lucide-react";

function SearchResults() {
  const [sp] = useSearchParams();
  const q = sp.get("q") || "";

  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [sort, setSort] = useState("relevance");

  const observer = useRef();

  // Infinite scroll hook
  const lastVideoRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    setVideos([]);
    setPage(1);
  }, [q, sort]);

  useEffect(() => {
    if (!q) return;
    setLoading(true);
    setError("");
    api
      .get("/videos", {
        params: { q, page, sort },
      })
      .then(({ data }) => {
        if (page === 1) {
          setVideos(data.videos);
        } else {
          setVideos((prev) => [...prev, ...data.videos]);
        }
        setHasMore(data.videos.length > 0);
      })
      .catch(() => setError("Something went wrong. Try again later."))
      .finally(() => setLoading(false));
  }, [q, page, sort]);

  return (
    <div className="px-4 sm:px-6 py-4 text-white">
      {/* Header with count & filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <h2 className="text-lg sm:text-xl font-semibold">
          Results for <span className="text-red-500">“{q}”</span>
        </h2>
        <div className="flex gap-2 mt-2 sm:mt-0">
          {/* Sort Dropdown */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="bg-[#181818] border border-gray-700 rounded-md px-3 py-2 text-sm"
          >
            <option value="relevance">Relevance</option>
            <option value="date">Upload Date</option>
            <option value="views">Most Viewed</option>
          </select>
        </div>
      </div>

      {/* Error */}
      {error && (
        <p className="text-center text-red-400 font-medium py-4">{error}</p>
      )}

      {/* No Results */}
      {!loading && !error && videos.length === 0 && (
        <p className="text-center text-gray-400 py-10">
          No results found for <span className="text-white font-medium">“{q}”</span>
        </p>
      )}

      {/* Video Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {videos.map((v, i) => {
          if (i === videos.length - 1) {
            return <VideoCard ref={lastVideoRef} key={v._id} v={v} />;
          } else {
            return <VideoCard key={v._id} v={v} />;
          }
        })}
      </div>

      {/* Loader for infinite scroll */}
      {loading && (
        <div className="flex justify-center items-center py-6">
          <Loader2 className="w-6 h-6 text-red-500 animate-spin" />
          <span className="ml-2 text-gray-300">Loading more...</span>
        </div>
      )}
    </div>
  );
}

export default SearchResults;
