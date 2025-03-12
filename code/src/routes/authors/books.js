import express from "express";
import {
  getBooksByAuthor,
  getAllAuthors,
  getAuthorById,
} from "../../controllers/authorsController.js";

const router = express.Router({ mergeParams: true });

// Get all authors
router.get("/", getAllAuthors);

// Get a specific author by ID
router.get("/:id", getAuthorById);

// Get all books for a specific author
router.get("/:id/books", getBooksByAuthor);

export default router;
