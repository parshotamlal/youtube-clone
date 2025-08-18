import { Link } from 'react-router-dom'
import {
  Home,
  Compass,
  History,
  ThumbsUp,
  Clock,
  PlaySquare,
  User,
  Upload,
  Film,
  Radio,
  Gamepad,
  Music,
  Settings,
  Flag,
  HelpCircle,
  MessageSquare,
} from 'lucide-react'

function Sidebar({ open }) {
  return (
    <aside
      className={`transition-all duration-200 ${
        open ? 'w-60' : 'w-0'
      } overflow-y-auto bg-black text-white h-screen sticky top-14 flex flex-col justify-between`}
    >
      {/* NAVIGATION */}
      <nav className="p-3 space-y-2 text-sm">
        {/* MAIN SECTION */}
        <Link className="flex items-center gap-3 p-2 rounded hover:bg-gray-800" to="/">
          <Home className="w-5 h-5" />
          <span>Home</span>
        </Link>
        <Link className="flex items-center gap-3 p-2 rounded hover:bg-gray-800" to="/shorts">
          <Film className="w-5 h-5" />
          <span>Shorts</span>
        </Link>
        <Link className="flex items-center gap-3 p-2 rounded hover:bg-gray-800" to="/subscriptions">
          <PlaySquare className="w-5 h-5" />
          <span>Subscriptions</span>
        </Link>

        <hr className="my-2 border-gray-700" />

        {/* YOU SECTION */}
        <p className="px-2 text-xs font-semibold text-gray-400 uppercase">You</p>
        <Link className="flex items-center gap-3 p-2 rounded hover:bg-gray-800" to="/profile">
          <User className="w-5 h-5" />
          <span>Your Channel</span>
        </Link>
        <Link className="flex items-center gap-3 p-2 rounded hover:bg-gray-800" to="/history">
          <History className="w-5 h-5" />
          <span>History</span>
        </Link>
        <Link className="flex items-center gap-3 p-2 rounded hover:bg-gray-800" to="/watch-later">
          <Clock className="w-5 h-5" />
          <span>Watch Later</span>
        </Link>
        <Link className="flex items-center gap-3 p-2 rounded hover:bg-gray-800" to="/liked">
          <ThumbsUp className="w-5 h-5" />
          <span>Liked Videos</span>
        </Link>
        <Link className="flex items-center gap-3 p-2 rounded hover:bg-gray-800" to="/upload">
          <Upload className="w-5 h-5" />
          <span>Upload</span>
        </Link>

        <hr className="my-2 border-gray-700" />

        {/* EXPLORE SECTION */}
        <p className="px-2 text-xs font-semibold text-gray-400 uppercase">Explore</p>
        <Link className="flex items-center gap-3 p-2 rounded hover:bg-gray-800" to="/trending">
          <Compass className="w-5 h-5" />
          <span>Trending</span>
        </Link>
        <Link className="flex items-center gap-3 p-2 rounded hover:bg-gray-800" to="/music">
          <Music className="w-5 h-5" />
          <span>Music</span>
        </Link>
        <Link className="flex items-center gap-3 p-2 rounded hover:bg-gray-800" to="/gaming">
          <Gamepad className="w-5 h-5" />
          <span>Gaming</span>
        </Link>
        <Link className="flex items-center gap-3 p-2 rounded hover:bg-gray-800" to="/live">
          <Radio className="w-5 h-5" />
          <span>Live</span>
        </Link>

        <hr className="my-2 border-gray-700" />

        {/* SETTINGS & SUPPORT */}
        <p className="px-2 text-xs font-semibold text-gray-400 uppercase">Settings & Support</p>
        <Link className="flex items-center gap-3 p-2 rounded hover:bg-gray-800" to="/settings">
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </Link>
        <Link className="flex items-center gap-3 p-2 rounded hover:bg-gray-800" to="/report-history">
          <Flag className="w-5 h-5" />
          <span>Report History</span>
        </Link>
        <Link className="flex items-center gap-3 p-2 rounded hover:bg-gray-800" to="/help">
          <HelpCircle className="w-5 h-5" />
          <span>Help</span>
        </Link>
        <Link className="flex items-center gap-3 p-2 rounded hover:bg-gray-800" to="/feedback">
          <MessageSquare className="w-5 h-5" />
          <span>Feedback</span>
        </Link>
      </nav>

      {/* FOOTER */}
      <footer className="p-3 text-xs text-gray-400 space-y-2">
        <div className="flex flex-wrap gap-2">
          <span>About</span>
          <span>Press</span>
          <span>Copyright</span>
          <span>Contact us</span>
          <span>Creator</span>
          <span>Advertise</span>
          <span>Developers</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <span>Terms</span>
          <span>Privacy</span>
          <span>Policy & Safety</span>
          <span>How YouTube works</span>
          <span>Test new features</span>
        </div>
        <p className="text-gray-500">© 2025 Parshotam</p>
      </footer>
    </aside>
  )
}

export default Sidebar
