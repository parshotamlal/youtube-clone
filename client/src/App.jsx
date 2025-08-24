import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import LoadingSpinner from './components/UI/LoadingSpinner';
import { AuthProvider } from './contexts/AuthContext';
import { VideoProvider } from './contexts/VideoContext';
import "./index.css"

// Lazy load pages
const HomePage = React.lazy(() => import('./pages/HomePage'));
const VideoPlayerPage = React.lazy(() => import('./pages/VideoPlayerPage'));
const ChannelPage = React.lazy(() => import('./pages/ChannelPage'));
const AuthPage = React.lazy(() => import('./pages/AuthPage'));
const SearchResultsPage = React.lazy(() => import('./pages/SearchResultsPage'));

function App() {
  return (
    <AuthProvider>
      <VideoProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/" element={<Layout />}>
                  <Route index element={<HomePage />} />
                  <Route path="/video/:videoId" element={<VideoPlayerPage />} />
                  <Route path="/channel/:channelId" element={<ChannelPage />} />
                  <Route path="/search" element={<SearchResultsPage />} />
                </Route>
              </Routes>
            </Suspense>
          </div>
        </Router>
      </VideoProvider>
    </AuthProvider>
  );
}

export default App;