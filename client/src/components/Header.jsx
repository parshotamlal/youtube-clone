import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useState } from 'react'
import { Menu, Search, Mic, Bell, Video, User } from 'lucide-react'
import { FaYoutube } from "react-icons/fa";

function Header({ onToggle }) {
  const { user, logout } = useAuth();
  const [q, setQ] = useState('');
  const [showNotif, setShowNotif] = useState(false);
  const nav = useNavigate();

  const search = (e) => {
    e.preventDefault();
    if (q.trim()) {
      nav(`/search?q=${encodeURIComponent(q)}`);
    }
  };

  return (
    <header className="sticky top-0 z-20 bg-black border-b border-gray-800 shadow-sm">
      <div className="flex items-center justify-between px-3 md:px-6 h-14">
        
        {/* LEFT: Menu + Logo */}
        <div className="flex items-center gap-4">
          <button
            onClick={onToggle}
            className="p-2 rounded-full hover:bg-gray-800 transition-colors"
            aria-label="Toggle sidebar"
          >
            <Menu className="w-6 h-6 text-white" />
          </button>
          <Link to="/" className="flex items-center gap-1 font-bold text-xl text-red-600">
            <FaYoutube className="w-8 h-8" />
            <span className="hidden sm:inline text-white">YouTube</span>
          </Link>
        </div>

        {/* CENTER: Search Bar + Mic */}
        <form
          onSubmit={search}
          className="hidden sm:flex flex-1 max-w-2xl mx-4 items-center"
        >
          <div className="flex w-full">
            <input
              type="text"
              className="flex-1 bg-[#121212] border border-gray-700 text-white rounded-l-full px-4 py-2 
                        focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm placeholder-gray-400"
              placeholder="Search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
            <button
              type="submit"
              className="border border-l-0 border-gray-700 bg-[#222222] 
                        rounded-r-full px-5 flex items-center justify-center 
                        hover:bg-gray-700 transition"
            >
              <Search className="w-5 h-5 text-gray-300" />
            </button>
          </div>
          {/* Mic Button */}
          <button
            type="button"
            className="ml-2 p-2 rounded-full bg-[#222222] hover:bg-gray-700 transition"
            aria-label="Voice Search"
          >
            <Mic className="w-5 h-5 text-white" />
          </button>
        </form>

        {/* RIGHT: Create + Notifications + User */}
        <div className="flex items-center gap-2 sm:gap-4 relative">
          {user && (
            <>
              {/* Create/Upload Button */}
              <button
                className="p-2 rounded-full hover:bg-gray-800 transition"
                aria-label="Create"
              >
                <Video className="w-6 h-6 text-white" />
              </button>

              {/* Notifications with Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowNotif(!showNotif)}
                  className="relative p-2 rounded-full hover:bg-gray-800 transition"
                  aria-label="Notifications"
                >
                  <Bell className="w-6 h-6 text-white" />
                  {/* Notification dot */}
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-full"></span>
                </button>

                {/* Dropdown */}
                {showNotif && (
                  <div className="absolute right-0 mt-2 w-72 bg-[#1f1f1f] border border-gray-700 rounded-xl shadow-lg z-30">
                    <div className="px-4 py-2 border-b border-gray-700 text-white font-semibold">
                      Notifications
                    </div>
                    <ul className="max-h-60 overflow-y-auto text-sm">
                      <li className="px-4 py-3 hover:bg-gray-800 cursor-pointer text-gray-300">
                        📺 New video from <span className="font-semibold">React Mastery</span>
                      </li>
                      <li className="px-4 py-3 hover:bg-gray-800 cursor-pointer text-gray-300">
                        👍 Your comment got a reply!
                      </li>
                      <li className="px-4 py-3 hover:bg-gray-800 cursor-pointer text-gray-300">
                        🔔 Don’t miss our latest update
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </>
          )}

          {/* User / Sign in */}
          {!user ? (
            <Link
              to="/login"
              className="px-4 py-2 rounded-full border border-gray-600 text-white 
                         font-medium text-sm hover:bg-gray-800 transition"
            >
              Sign in
            </Link>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={logout}
                className="hidden sm:inline px-4 py-2 rounded-full border 
                           border-gray-600 text-white font-medium text-sm hover:bg-gray-800 transition"
              >
                Sign out
              </button>
              {/* Avatar */}
              <div className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-600 hover:bg-gray-500 cursor-pointer transition">
                <User className="w-5 h-5 text-white" />
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header;
