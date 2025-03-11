import express from "express";
import { getBooksByCategory } from "../../controllers/categoriesController.js";

const router = express.Router({ mergeParams: true });

// Get all books for a specific category
router.get("/:id/books", getBooksByCategory);

export default router;
