export const videos = [
  {
    videoId: "video01",
    title: "Learn React in 30 Minutes - Complete Beginner Tutorial",
    thumbnailUrl: "https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=1280&h=720&fit=crop",
    description: "A comprehensive tutorial covering React fundamentals, components, hooks, and state management. Perfect for beginners looking to get started with React development.",
    channelId: "channel01",
    uploader: "user01",
    views: 152000,
    likes: 10230,
    dislikes: 145,
    uploadDate: "2024-01-15",
    duration: "30:45",
    category: "Education",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    comments: [
      {
        commentId: "comment01",
        userId: "user02",
        username: "TechEnthusiast",
        avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150",
        text: "This is exactly what I needed! Clear explanations and great examples.",
        timestamp: "2024-01-16T08:30:00Z",
        likes: 45
      },
      {
        commentId: "comment02",
        userId: "user03",
        username: "CodeNewbie",
        avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150",
        text: "Finally understand useState and useEffect. Thank you!",
        timestamp: "2024-01-16T10:15:00Z",
        likes: 23
      }
    ]
  },
  {
    videoId: "video02",
    title: "Advanced JavaScript Concepts Every Developer Should Know",
    thumbnailUrl: "https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=1280&h=720&fit=crop",
    description: "Deep dive into closures, prototypes, async/await, and other advanced JavaScript concepts that will make you a better developer.",
    channelId: "channel01",
    uploader: "user01",
    views: 89000,
    likes: 7890,
    dislikes: 67,
    uploadDate: "2024-01-10",
    duration: "45:20",
    category: "Education",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    comments: [
      {
        commentId: "comment03",
        userId: "user04",
        username: "JSMaster",
        avatar: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150",
        text: "Great explanation of closures. This helped me understand them finally!",
        timestamp: "2024-01-11T14:20:00Z",
        likes: 67
      }
    ]
  },
  {
    videoId: "video03",
    title: "Building a Modern Web App with Node.js and Express",
    thumbnailUrl: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1280&h=720&fit=crop",
    description: "Complete tutorial on building a full-stack web application using Node.js, Express, and MongoDB. Includes authentication and deployment.",
    channelId: "channel02",
    uploader: "user05",
    views: 234000,
    likes: 15600,
    dislikes: 234,
    uploadDate: "2024-01-05",
    duration: "1:23:15",
    category: "Education",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    comments: []
  },
  {
    videoId: "video04",
    title: "10 Amazing Nature Photography Tips",
    thumbnailUrl: "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1280&h=720&fit=crop",
    description: "Professional photographer shares insider tips for capturing stunning nature photographs. Equipment recommendations and composition techniques included.",
    channelId: "channel03",
    uploader: "user06",
    views: 45600,
    likes: 3400,
    dislikes: 23,
    uploadDate: "2024-01-12",
    duration: "18:30",
    category: "Entertainment",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    comments: []
  },
  {
    videoId: "video05",
    title: "Cooking the Perfect Italian Pasta - Traditional Recipe",
    thumbnailUrl: "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=1280&h=720&fit=crop",
    description: "Learn how to make authentic Italian pasta from scratch with this traditional family recipe passed down through generations.",
    channelId: "channel04",
    uploader: "user07",
    views: 78900,
    likes: 5670,
    dislikes: 45,
    uploadDate: "2024-01-08",
    duration: "25:40",
    category: "Food",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    comments: []
  },
  {
    videoId: "video06",
    title: "React Router v6 Complete Guide - Navigation Made Easy",
    thumbnailUrl: "https://images.pexels.com/photos/4348404/pexels-photo-4348404.jpeg?auto=compress&cs=tinysrgb&w=1280&h=720&fit=crop",
    description: "Master React Router v6 with this comprehensive guide covering nested routes, lazy loading, and advanced navigation patterns.",
    channelId: "channel01",
    uploader: "user01",
    views: 67800,
    likes: 4560,
    dislikes: 32,
    uploadDate: "2024-01-18",
    duration: "42:15",
    category: "Education",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    comments: []
  }
];

export const channels = [
  {
    channelId: "channel01",
    channelName: "Code with John",
    owner: "user01",
    description: "Coding tutorials and tech reviews by John Doe. Weekly videos on React, JavaScript, Node.js, and web development best practices.",
    channelBanner: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1280&h=400&fit=crop",
    avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150",
    subscribers: 52000,
    videos: ["video01", "video02", "video06"],
    verified: true
  },
  {
    channelId: "channel02",
    channelName: "Full Stack Dev",
    owner: "user05",
    description: "Complete web development tutorials covering frontend, backend, and deployment strategies.",
    channelBanner: "https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=1280&h=400&fit=crop",
    avatar: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150",
    subscribers: 34500,
    videos: ["video03"],
    verified: true
  },
  {
    channelId: "channel03",
    channelName: "Nature Lens",
    owner: "user06",
    description: "Photography tutorials and breathtaking nature content from around the world.",
    channelBanner: "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1280&h=400&fit=crop",
    avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150",
    subscribers: 18900,
    videos: ["video04"],
    verified: false
  },
  {
    channelId: "channel04",
    channelName: "Mama's Kitchen",
    owner: "user07",
    description: "Traditional cooking recipes and culinary adventures from around the world.",
    channelBanner: "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=1280&h=400&fit=crop",
    avatar: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150",
    subscribers: 45600,
    videos: ["video05"],
    verified: true
  }
];

export const users = [
  {
    userId: "user01",
    username: "JohnDoe",
    email: "john@example.com",
    password: "hashedPassword123",
    avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150",
    channels: ["channel01"],
    subscribedChannels: ["channel02", "channel03"],
    likedVideos: ["video02", "video03"]
  },
  {
    userId: "user02",
    username: "TechEnthusiast",
    email: "tech@example.com",
    password: "hashedPassword456",
    avatar: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150",
    channels: [],
    subscribedChannels: ["channel01", "channel02"],
    likedVideos: ["video01", "video04"]
  }
];

export const categories = [
  "All",
  "Education",
  "Entertainment", 
  "Music",
  "Gaming",
  "News",
  "Sports",
  "Technology",
  "Food",
  "Travel",
  "Science",
  "Arts"
];