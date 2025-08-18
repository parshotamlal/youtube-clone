import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import { Home } from './pages/Home'
import SearchResults from './pages/SearchResults'
import Upload from './pages/Upload'
import { Login } from './pages/Login'
import Profile from './pages/Profile'
import VideoPlayer from './pages/VideoPlayer'
import Channel from './pages/Channel'
import { useState } from 'react'
import "./App.css"

export default function App() {
  const [open, setOpen] = useState(true);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header with dark background */}
      <Header onToggle={() => setOpen(o => !o)} />

      <div className="flex">
        {/* Sidebar dark */}
        <Sidebar open={open} />

        {/* Main Content Area */}
        <main className="flex-1 p-4 bg-black text-white">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/video/:id" element={<VideoPlayer />} />
            <Route path="/channel/:id" element={<Channel />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}
