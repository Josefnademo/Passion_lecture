import express from "express";
import {
  getComments,
  addComment,
} from "../../controllers/commentsController.js";

const router = express.Router({ mergeParams: true });

// Get all comments for a specific book
router.get("/:id/comments", getComments);

// Add a comment to a specific book
router.post("/:id/comments", addComment);

export default router;
