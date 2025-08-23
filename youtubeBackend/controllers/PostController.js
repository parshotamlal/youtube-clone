import User from "../models/UserModel.js";
import Post from "../models/PostModel.js";

// Add a new post
export const AddPost = async (req, res) => {
  try {
    let { title, description, videoUrl } = req.body;
    console.log(title, description, videoUrl);
    const userId = req.user; // From auth middleware

    // Validate required fields
    if (!title || !videoUrl) {
      return res.status(400).json({
        success: false,
        message: "Title and video URL are required",
      });
    }

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Create new post
    const newPost = new Post({
      userId,
      title,
      description,
      videoUrl,
    });

    await newPost.save();

    // Populate user info for response
    await newPost.populate("userId", "username profilePicture");

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      data: {
        post: newPost,
      },
    });
  } catch (error) {
    console.error("Add post error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Get all posts with pagination
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("userId", "username profilePicture")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (error) {
    console.error("Get posts error:", error);
    res.status(200).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Update post
export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id,"id")
    const { title, description, videoUrl } = req.body;
    const user = req.user; // From auth middleware

    if(!user){
      return res.status(400).json({message:"usernot found"})
    }
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }
   console.log(user)

    console.log(post.userId, user._id)

  

    // Update fields
    if (title) post.title = title;
    if (description !== undefined) post.description = description;
    if (videoUrl) post.videoUrl = videoUrl;

    await post.save();

    res.status(200).json({
      success: true,
      message: "Post updated successfully",
      data: {
        post,
      },
    });
  } catch (error) {
    console.error("Update post error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
// Get post by ID
export const getPostById = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id).populate(
      "userId",
      "username profilePicture"
    );

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.status(200).json({
      success: true,
      data: {
        post,
      },
    });
  } catch (error) {
    console.error("Get post by ID error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};



// Delete post
export const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user; // From auth middleware

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    // Check if user owns the post
    if (post.userId.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "You can only delete your own posts",
      });
    }

    await Post.findByIdAndDelete(postId);

    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    console.error("Delete post error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
