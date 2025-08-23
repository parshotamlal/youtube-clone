import { Router } from "express";
import { authenticateToken } from "../middleware/auth.js";
import {
  AddPost,
  getPosts,
  updatePost,
  getPostById,
} from "../controllers/PostController.js";

const router = Router();

router.post("/addpost", authenticateToken, AddPost);
router.get("/getpost", authenticateToken, getPosts);
router.post("/updatepost/:id", authenticateToken, updatePost);
router.get("/getpost/:id", authenticateToken, getPostById);
export default router;
