import { Router } from "express";
import { authenticateToken } from "../middleware/auth.js";
import { AddPost, getPosts } from "../controllers/PostController.js";

const router = Router();

router.post("/addpost", authenticateToken, AddPost);
router.get("/getpost", authenticateToken, getPosts);
export default router;
