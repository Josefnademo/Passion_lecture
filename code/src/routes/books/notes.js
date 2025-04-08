import express from "express";
import  NotesController  from "../../controllers/notesController.js"; // Importation par défaut

const router = express.Router({ mergeParams: true });

router.get("/:book_id/notes", NotesController.getEvaluationsForBook); // GET /books/:bookId/evaluations
router.post("/:id/notes/", NotesController.createEvaluation); // POST /books/:bookId/evaluations
router.get("/:id/notes/:noteId", NotesController.getEvaluationById); // GET /books/:bookId/evaluations/:noteId
router.put("/:id/notes/:noteId", NotesController.updateEvaluation); // PUT /books/:bookId/evaluations/:noteId
router.delete("/:id/notes/:noteId", NotesController.deleteEvaluation); // DELETE /books/:bookId/evaluations/:noteId

export default router;
/// /api/books/:id/notes
