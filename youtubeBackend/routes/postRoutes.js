import { Router } from "express";
import { authenticateToken } from "../middleware/auth.js";
import { AddPost } from "../controllers/PostController.js";

const router = Router();

router.post("/addpost", authenticateToken, AddPost);

export default router;
