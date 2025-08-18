import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

function Profile() {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);

  if (!user) return <div className="text-center text-gray-400">Please sign in.</div>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex items-center gap-4 mb-6">
        <img
          src={user.avatar || "https://ui-avatars.com/api/?name=" + user.username}
          alt="Profile Avatar"
          className="w-20 h-20 rounded-full border shadow-md object-cover"
        />
        <div>
          <h2 className="text-2xl font-semibold text-white">{user.username}</h2>
          <p className="text-gray-400">{user.email}</p>
          <p className="text-sm text-gray-500">Joined: {new Date(user.createdAt).toDateString()}</p>
        </div>
      </div>

      {/* Stats Section (optional if API supports it) */}
      <div className="grid grid-cols-3 gap-4 text-center mb-6">
        <div className="p-3 rounded bg-gray-900 shadow">
          <p className="text-lg font-bold text-white">{user.videosCount || 0}</p>
          <p className="text-gray-400 text-sm">Videos</p>
        </div>
        <div className="p-3 rounded bg-gray-900 shadow">
          <p className="text-lg font-bold text-white">{user.subscribers || 0}</p>
          <p className="text-gray-400 text-sm">Subscribers</p>
        </div>
        <div className="p-3 rounded bg-gray-900 shadow">
          <p className="text-lg font-bold text-white">{user.likes || 0}</p>
          <p className="text-gray-400 text-sm">Likes</p>
        </div>
      </div>

      {/* Profile Edit / Info */}
      <div className="bg-gray-800 rounded-lg p-4 shadow">
        {editing ? (
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              defaultValue={user.username}
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
            />
            <input
              type="email"
              placeholder="Email"
              defaultValue={user.email}
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
            />
            <button className="w-full py-2 bg-red-600 text-white rounded">Save Changes</button>
          </form>
        ) : (
          <>
            <div className="space-y-2 text-gray-300">
              <p><span className="font-semibold">Username:</span> {user.username}</p>
              <p><span className="font-semibold">Email:</span> {user.email}</p>
            </div>
            <button
              onClick={() => setEditing(true)}
              className="mt-4 w-full py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
            >
              Edit Profile
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Profile;
