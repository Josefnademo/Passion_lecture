import express from "express";
import { addNote } from "../../controllers/notesController.js";

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
  addNote
);

export default router;
