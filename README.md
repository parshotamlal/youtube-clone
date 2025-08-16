youtube-clone-mern/
├─ client/   # React + Vite + Tailwind (JSX)
│  ├─ src/components: Header, Sidebar, SearchBar, VideoCard, FilterChips
│  ├─ src/pages: Home, VideoPlayerPage, ChannelPage, AuthPage
│  └─ vite/tailwind/postcss configs
└─ server/   # Express + MongoDB + JWT
   ├─ src/models: User, Channel, Video, Comment
   ├─ src/routes: auth, videos, channels, comments
   ├─ src/middleware: auth (JWT guard)
   └─ src/seed.js

