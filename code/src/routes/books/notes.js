import express from "express";
import { getNotes, addNote } from "../../controllers/notesController.js";

const router = express.Router({ mergeParams: true });

// Get all notes for a specific book
router.get("/:id/notes", getNotes);

// Add a note to a specific book
router.post("/:id/notes", addNote);

export default router;
