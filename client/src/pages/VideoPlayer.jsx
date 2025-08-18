import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { ThumbsUp, ThumbsDown, Share2, Save } from "lucide-react";

export default function VideoPlayer() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const { user } = useAuth();

  const load = async () => {
    const v = await api.get(`/videos/${id}`);
    setVideo(v.data);
    const c = await api.get(`/comments/video/${id}`);
    setComments(c.data);
  };
  useEffect(() => {
    load();
  }, [id]);

  const addComment = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    await api.post(`/comments/video/${id}`, { text });
    setText("");
    load();
  };

  const editComment = async (cid, newText) => {
    await api.put(`/comments/${cid}`, { text: newText });
    load();
  };

  const deleteComment = async (cid) => {
    await api.delete(`/comments/${cid}`);
    load();
  };

  const like = async () => {
    if (video) {
      const { data } = await api.post(`/videos/${video._id}/like`);
      setVideo((v) => ({ ...v, likes: data.likes }));
    }
  };
  const dislike = async () => {
    if (video) {
      const { data } = await api.post(`/videos/${video._id}/dislike`);
      setVideo((v) => ({ ...v, dislikes: data.dislikes }));
    }
  };

  if (!video) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="grid lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
      {/* Left Side: Video + Info */}
      <div className="lg:col-span-2 space-y-4">
        {/* Video Player */}
        <video className="w-full rounded-lg" controls src={video.videoUrl} />

        {/* Title */}
        <h1 className="text-2xl font-bold">{video.title}</h1>
        <div className="flex justify-between text-sm text-gray-500">
          <p>{video.views || 0} views • {new Date(video.createdAt).toLocaleDateString()}</p>
        </div>

        {/* Channel Info + Subscribe */}
        <div className="flex justify-between items-center py-3 border-b">
          <div className="flex items-center gap-3">
            <img src={video.channel?.avatarUrl || "/default-avatar.png"} alt="channel" className="w-10 h-10 rounded-full" />
            <div>
              <p className="font-semibold">{video.channel?.channelName}</p>
              <p className="text-sm text-gray-500">100K subscribers</p>
            </div>
          </div>
          <button className="px-4 py-2 bg-red-600 text-white rounded-full font-semibold hover:bg-red-700">
            Subscribe
          </button>
        </div>

        {/* Engagement Buttons */}
        <div className="flex items-center gap-3 py-2 border-b">
          <button onClick={like} className="flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200">
            <ThumbsUp size={18} /> {video.likes}
          </button>
          <button onClick={dislike} className="flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200">
            <ThumbsDown size={18} /> {video.dislikes}
          </button>
          <button className="flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200">
            <Share2 size={18} /> Share
          </button>
          <button className="flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200">
            <Save size={18} /> Save
          </button>
        </div>

        {/* Description */}
        <p className="whitespace-pre-line text-gray-800">{video.description}</p>

        {/* Comments Section */}
        <section className="pt-4">
          <h3 className="font-semibold mb-3">{comments.length} Comments</h3>
          {user && (
            <form onSubmit={addComment} className="flex gap-2 mb-4">
              <input
                className="flex-1 border rounded px-3 py-2"
                placeholder="Add a comment..."
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <button className="px-4 py-2 rounded bg-blue-600 text-white">Post</button>
            </form>
          )}

          <ul className="space-y-3">
            {comments.map((c) => (
              <li key={c._id} className="flex gap-3 border-b pb-2">
                <img src={c.user?.avatar || "/default-avatar.png"} className="w-8 h-8 rounded-full" alt="" />
                <div className="flex-1">
                  <div className="text-sm text-gray-600">
                    {c.user?.username} • {new Date(c.createdAt).toLocaleString()}
                  </div>
                  <Editable
                    text={c.text}
                    onSave={(t) => editComment(c._id, t)}
                    canEdit={user && user.id === c.user?._id}
                    onDelete={() => deleteComment(c._id)}
                  />
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Right Side: Recommended Videos */}
      <aside className="space-y-4">
        <h3 className="font-semibold">Recommended</h3>
        {/* Later you can map over recommended videos here */}
        <div className="p-3 border rounded">Recommended video 1</div>
        <div className="p-3 border rounded">Recommended video 2</div>
      </aside>
    </div>
  );
}

function Editable({ text, onSave, canEdit, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [val, setVal] = useState(text);
  if (!canEdit) return <p className="mt-1">{text}</p>;
  return editing ? (
    <div className="flex gap-2 mt-1">
      <input
        className="flex-1 border rounded px-2 py-1"
        value={val}
        onChange={(e) => setVal(e.target.value)}
      />
      <button
        className="px-2 border rounded"
        onClick={() => {
          onSave(val);
          setEditing(false);
        }}
      >
        Save
      </button>
      <button className="px-2 border rounded" onClick={() => setEditing(false)}>
        Cancel
      </button>
    </div>
  ) : (
    <div className="flex items-center gap-2 mt-1">
      <p className="flex-1">{text}</p>
      <button className="px-2 border rounded" onClick={() => setEditing(true)}>
        Edit
      </button>
      <button className="px-2 border rounded" onClick={onDelete}>
        Delete
      </button>
    </div>
  );
}
