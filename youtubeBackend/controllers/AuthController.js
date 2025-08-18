import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";
import { supabase } from "../Supabase/SupabaseConfig.js";
// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET || "your-secret-key", {
    expiresIn: "7d",
  });
};

// Signup controller
export const signup = async (req, res) => {
  try {
    const { username, email, password, dateOfBirth } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email or username already exists",
      });
    }

    // Create new user with plain text password
    const newUser = new User({
      username,
      email,
      password, // Store password as plain text
      dateOfBirth,
    });

    await newUser.save();

    // Generate token
    const token = generateToken(newUser._id);

    // Remove password from response
    const userResponse = newUser.toObject();
    delete userResponse.password;

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        user: userResponse,
        token,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Signin controller
export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: "Account is deactivated",
      });
    }

    // Check password directly (plain text comparison)
    if (user.password !== password) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate token
    const token = generateToken(user._id);

    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        user: userResponse,
        token,
      },
    });
  } catch (error) {
    console.error("Signin error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// profile picture
export const uploadimage = async (req, res) => {
  try {
    const file = req.file;
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    if (!file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }
    const filename = `${Date.now()}_${file.originalname}`;

    const { data, error } = await supabase.storage
      .from("Images")
      .upload(filename, file.buffer, {
        contentType: file.mimetype,
        upsert: true,
      });
    const { data: publicUrl } = supabase.storage
      .from("Images")
      .getPublicUrl(filename);

    user.profilePicture = publicUrl.publicUrl;
    await user.save();

    return res.json({ url: publicUrl.publicUrl });
  } catch (error) {
    return res.status(500).json({ error: err.message });
  }
};


// Get current user profile
export const getProfile = async (req, res) => {
  try {
    const userId = req.userId; // This will be set by auth middleware

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: {
        user,
      },
    });
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
