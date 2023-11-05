import express from "express";
import {
  getPostsBySearch,
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
} from "../controllers/postsController.js";
import verifyJWT from "../middleware/verifyJWT.js";
import upload from "../middleware/multer.js";

const router = express.Router();

router.get('/search', getPostsBySearch)
router.get("/", getAllPosts);
router.post("/", verifyJWT, upload.single("image"), createPost);
router.patch("/:id", verifyJWT, upload.single("image"), updatePost);
router.delete("/:id", verifyJWT, deletePost);
router.patch("/:id/likePost", verifyJWT, likePost);

export default router;
