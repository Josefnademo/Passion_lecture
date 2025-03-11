import express from "express";
import { addNote } from "../../controllers/notesController.js";

const router = express.Router({ mergeParams: true });

router.post("/", addNote);

export default router;
