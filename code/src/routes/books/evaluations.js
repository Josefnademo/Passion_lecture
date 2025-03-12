import express from "express";
import {
  addEvaluation,
  getEvaluations,
} from "../../controllers/evaluateController.js";

const router = express.Router({ mergeParams: true });

// Get all evaluations for a specific book
router.get("/", getEvaluations);

// Add an evaluation to a specific book
router.post("/", addEvaluation);

export default router;
