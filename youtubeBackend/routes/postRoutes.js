import { Router } from "express";
import { authenticateToken } from "../middleware/auth.js";
import {
  AddPost,
  getPosts,
  updatePost,
  getPostById,
  deletePost,
} from "../controllers/PostController.js";

const router = Router();

router.post("/addpost", authenticateToken, AddPost);
router.get("/getpost", authenticateToken, getPosts);
router.post("/updatepost/:id", authenticateToken, updatePost);
router.get("/getpost/:id", authenticateToken, getPostById);
router.post("/deletepost/:id", authenticateToken, deletePost);
export default router;
