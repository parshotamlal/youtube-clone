import express from "express";
import { signup, signin, uploadimage } from "../controllers/AuthController.js";
import { authenticateToken } from "../middleware/auth.js";
import multer from "multer";
const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post(
  "/uploadimage",
  authenticateToken,
  upload.single("file"),
  uploadimage
);

export default router;
