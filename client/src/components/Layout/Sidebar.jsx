import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, TrendingUp, Music, Film, Gamepad2, Newspaper, Trophy, Lightbulb, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { isAuthenticated, user } = useAuth();

  const sidebarItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: TrendingUp, label: 'Trending', path: '/trending' },
    { icon: Music, label: 'Music', path: '/music' },
    { icon: Film, label: 'Movies', path: '/movies' },
    { icon: Gamepad2, label: 'Gaming', path: '/gaming' },
    { icon: Newspaper, label: 'News', path: '/news' },
    { icon: Trophy, label: 'Sports', path: '/sports' },
    { icon: Lightbulb, label: 'Learning', path: '/learning' },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 z-50 transform transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:relative lg:translate-x-0
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 lg:hidden">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="p-2 space-y-1">
          {sidebarItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link
                key={index}
                to={item.path}
                onClick={() => {
                  if (window.innerWidth < 1024) {
                    onClose();
                  }
                }}
                className={`
                  flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors
                  ${isActive(item.path) 
                    ? 'bg-gray-100 text-red-600 font-medium' 
                    : 'hover:bg-gray-100 text-gray-700'
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Authenticated User Section */}
        {isAuthenticated && (
          <>
            <div className="border-t border-gray-200 mt-4 pt-4">
              <div className="px-4 py-2">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                  Your Channel
                </h3>
              </div>
              <nav className="p-2 space-y-1">
                <Link
                  to={`/channel/${user?.channels?.[0] || 'my-channel'}`}
                  onClick={() => {
                    if (window.innerWidth < 1024) {
                      onClose();
                    }
                  }}
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors hover:bg-gray-100 text-gray-700"
                >
                  <img
                    src={user?.avatar || 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=32'}
                    alt={user?.username}
                    className="w-5 h-5 rounded-full object-cover"
                  />
                  <span>Your Videos</span>
                </Link>
              </nav>
            </div>
          </>
        )}

        {/* Footer */}
        <div className="absolute bottom-4 left-4 right-4 text-xs text-gray-500">
          <p>&copy; 2024 YouTube Clone</p>
          <p className="mt-1">Built with React & Tailwind CSS</p>
        </div>
      </div>
    </>
  );
};

export default Sidebar;