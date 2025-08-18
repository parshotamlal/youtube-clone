import { useEffect, useState } from "react";
import api from "../api/axios";
import VideoCard from "../components/VideoCard";

const CATEGORIES = ["All", "Education","web developmemt","job interview","Music", "Gaming", "Sports", "News", "Comedy"];

function Home() {
  const [cat, setCat] = useState("All");
  const [search, setSearch] = useState("");
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  // Fetch videos
  useEffect(() => {
    setLoading(true);
    api
      .get("/videos", { params: { category: cat, page } })
      .then(({ data }) => {
        if (page === 1) {
          setVideos(data);
        } else {
          setVideos((prev) => [...prev, ...data]);
        }
        setHasMore(data.length > 0);
      })
      .finally(() => setLoading(false));
  }, [cat, page]);

  // Infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 200 >=
        document.documentElement.offsetHeight
      ) {
        if (!loading && hasMore) {
          setPage((p) => p + 1);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  // Search filter
  const filteredVideos = videos.filter((v) =>
    v.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-black min-h-screen text-white p-4 space-y-6">
      {/* Top Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        
        {/* Categories */}
        <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => {
                setCat(c);
                setPage(1);
              }}
              className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-all
                ${cat === c
                  ? "bg-red-600 text-white shadow-md shadow-red-700/50"
                  : "bg-neutral-900 hover:bg-neutral-800"}`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Search only */}
        <input
          type="text"
          placeholder="Search videos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-2 rounded-lg bg-neutral-900 focus:ring-2 focus:ring-red-600 outline-none text-white placeholder-gray-400"
        />
      </div>

      {/* Videos */}
      {loading && page === 1 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="animate-pulse bg-neutral-900 h-48 rounded-lg"
            />
          ))}
        </div>
      ) : filteredVideos.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredVideos.map((v) => (
            <div
              key={v._id}
              className="hover:scale-[1.02] transition-transform"
            >
              <VideoCard v={v} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400">No videos found.</p>
      )}

      {/* Infinite scroll loader */}
      {loading && page > 1 && (
        <div className="text-center py-6 text-gray-400">Loading more...</div>
      )}
    </div>
  );
}

export { Home };
