import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, Search, User, Video, Bell, Settings, LogOut, Upload } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useVideo } from '../../contexts/VideoContext';

const Header = ({ onToggleSidebar }) => {
  const { user, logout, isAuthenticated } = useAuth();
  const { searchQuery, setSearchQuery } = useVideo();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    if (localSearchQuery.trim()) {
      setSearchQuery(localSearchQuery.trim());
      if (location.pathname !== '/search') {
        navigate('/search');
      }
    }
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate('/');
  };

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-50">
      {/* Left Section */}
      <div className="flex items-center space-x-4">
        <button
          onClick={onToggleSidebar}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
            <Video className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold hidden sm:block">YouTube</span>
        </Link>
      </div>

      {/* Center Section - Search */}
      <div className="flex-1 max-w-2xl mx-4">
        <form onSubmit={handleSearch} className="flex">
          <div className="relative flex-1">
            <input
              type="text"
              value={localSearchQuery}
              onChange={(e) => setLocalSearchQuery(e.target.value)}
              placeholder="Search videos..."
              className="w-full px-4 py-2 border border-gray-300 rounded-l-full focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-full hover:bg-gray-200 transition-colors"
          >
            <Search className="w-5 h-5 text-gray-600" />
          </button>
        </form>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-2">
        {isAuthenticated ? (
          <>
            {/* Upload Button */}
            <Link
              to="/upload"
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Upload Video"
            >
              <Upload className="w-5 h-5 text-gray-700" />
            </Link>

            {/* Notifications */}
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <img
                  src={
                    user?.avatar ||
                    'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=32'
                  }
                  alt={user?.username}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="hidden md:block font-medium">{user?.username}</span>
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <Link
                    to="/channel/my-channel"
                    className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-100 transition-colors"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <User className="w-4 h-4" />
                    <span>Your Channel</span>
                  </Link>
                  <Link
                    to="/settings"
                    className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-100 transition-colors"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </Link>
                  <hr className="my-2" />
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-100 transition-colors w-full text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <Link
            to="/auth"
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <User className="w-4 h-4" />
            <span className="hidden sm:block">Sign In</span>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
