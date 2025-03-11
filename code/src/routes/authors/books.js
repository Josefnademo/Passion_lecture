import express from "express";
import { getBooksByAuthor } from "../../controllers/authorsController.js";

const router = express.Router({ mergeParams: true });

// Get all books for a specific author
router.get("/:id/books", getBooksByAuthor);

export default router;
