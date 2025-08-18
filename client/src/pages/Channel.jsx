import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import VideoCard from "../components/VideoCard";
import { useAuth } from "../context/AuthContext";

function Channel() {
  const { id } = useParams();
  const [channel, setChannel] = useState(null);
  const [editing, setEditing] = useState(null);
  const { user } = useAuth();

  const load = async () => {
    const { data } = await api.get(`/channels/${id}`);
    setChannel(data);
  };
  useEffect(() => {
    load();
  }, [id]);

  const canManage = user && channel && channel.owner === user.id;

  const saveVideo = async () => {
    await api.put(`/videos/${editing._id}`, editing);
    setEditing(null);
    load();
  };
  const deleteVideo = async (vid) => {
    await api.delete(`/videos/${vid._id}`);
    load();
  };

  if (!channel) return <div className="text-white p-4">Loading…</div>;

  return (
    <div className="bg-black min-h-screen text-white">
      {/* Banner */}
      <div className="w-full h-48 bg-gradient-to-r from-red-700 via-black to-red-900"></div>

      {/* Channel Header */}
      <div className="flex items-center gap-4 px-6 -mt-12">
        <img
          src={channel.avatarUrl || "https://via.placeholder.com/80"}
          alt={channel.channelName}
          className="w-24 h-24 rounded-full border-4 border-black"
        />
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{channel.channelName}</h1>
          <p className="text-gray-400">{channel.subscribers} subscribers</p>
          <p className="text-gray-400">{channel.description}</p>
        </div>
        {canManage && (
          <button className="px-4 py-2 bg-red-600 rounded font-semibold hover:bg-red-700">
            Customize Channel
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-6 border-b border-gray-700 mt-6 px-6">
        <button className="pb-2 border-b-2 border-red-600">Videos</button>
        <button className="pb-2 text-gray-400 hover:text-white">Playlists</button>
        <button className="pb-2 text-gray-400 hover:text-white">About</button>
      </div>

      {/* Videos */}
      <div className="p-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {channel.videos.map((v) => (
          <div key={v._id} className="relative group">
            <VideoCard v={v} />
            {canManage && (
              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition">
                <button
                  className="px-2 py-1 text-xs rounded bg-gray-800 hover:bg-gray-700"
                  onClick={() => setEditing(v)}
                >
                  Edit
                </button>
                <button
                  className="px-2 py-1 text-xs rounded bg-gray-800 hover:bg-gray-700"
                  onClick={() => deleteVideo(v)}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-xl w-full max-w-lg space-y-4 shadow-lg">
            <h4 className="text-xl font-semibold">Edit Video</h4>
            <input
              className="w-full border border-gray-700 bg-gray-800 text-white rounded px-2 py-1"
              value={editing.title}
              onChange={(e) => setEditing({ ...editing, title: e.target.value })}
            />
            <textarea
              className="w-full border border-gray-700 bg-gray-800 text-white rounded px-2 py-1"
              value={editing.description}
              onChange={(e) =>
                setEditing({ ...editing, description: e.target.value })
              }
            />
            <input
              className="w-full border border-gray-700 bg-gray-800 text-white rounded px-2 py-1"
              value={editing.thumbnailUrl}
              onChange={(e) =>
                setEditing({ ...editing, thumbnailUrl: e.target.value })
              }
            />
            <div className="flex gap-2 justify-end">
              <button
                className="px-3 py-1 border rounded bg-gray-800 hover:bg-gray-700"
                onClick={() => setEditing(null)}
              >
                Cancel
              </button>
              <button
                className="px-3 py-1 border rounded bg-red-600 hover:bg-red-700"
                onClick={saveVideo}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Channel;
