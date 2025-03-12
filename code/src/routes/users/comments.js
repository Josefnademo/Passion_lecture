import express from "express";
import {
  addUserComment,
  getUserComments,
} from "../../controllers/commentsController.js";

const router = express.Router({ mergeParams: true });

// Get all comments by a specific user
router.get("/:id/comments", getUserComments);

// Add a comment by a specific user
router.post("/:id/comments", addUserComment);

export default router;
