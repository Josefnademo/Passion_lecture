import express from "express";
import NotesController from "../../controllers/notesController.js"; // Importation par défaut

const router = express.Router({ mergeParams: true });

router.post(
  "/",
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  NotesController.createEvaluation
);

export default router;
