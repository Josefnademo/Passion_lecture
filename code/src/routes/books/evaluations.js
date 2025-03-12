import express from "express";
import {
  getEvaluations,
  addEvaluation,
} from "../../controllers/evaluationsController.js";

const router = express.Router({ mergeParams: true });

/**
 * @swagger
 * /api/books/{id}/evaluations:
 *   get:
 *     tags: [Evaluations]
 *     summary: Get all evaluations for a book
 *     description: Retrieve all evaluations (ratings and comments) associated with a specific book
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Book ID
 *     responses:
 *       200:
 *         description: List of evaluations retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   note:
 *                     type: integer
 *                     minimum: 0
 *                     maximum: 10
 *                   commentaire:
 *                     type: string
 *                   user_id:
 *                     type: integer
 *                   book_id:
 *                     type: integer
 *                   created:
 *                     type: string
 *                     format: date-time
 *                   updated:
 *                     type: string
 *                     format: date-time
 *       404:
 *         description: Book not found
 *       500:
 *         description: Server error
 */
router.get("/:id/evaluations", getEvaluations);

/**
 * @swagger
 * /api/books/{id}/evaluations:
 *   post:
 *     tags: [Evaluations]
 *     summary: Add an evaluation to a book
 *     description: Create a new evaluation (rating and comment) for a specific book
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Book ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - note
 *               - commentaire
 *               - user_id
 *             properties:
 *               note:
 *                 type: integer
 *                 minimum: 0
 *                 maximum: 10
 *                 description: Rating from 0 to 10
 *               commentaire:
 *                 type: string
 *                 description: Review comment
 *               user_id:
 *                 type: integer
 *                 description: ID of the user making the evaluation
 *     responses:
 *       201:
 *         description: Evaluation created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     note:
 *                       type: integer
 *                     commentaire:
 *                       type: string
 *                     user_id:
 *                       type: integer
 *                     book_id:
 *                       type: integer
 *       400:
 *         description: Invalid request body or rating out of range
 *       404:
 *         description: Book or user not found
 *       500:
 *         description: Server error
 */
router.post("/:id/evaluations", addEvaluation);

export default router;
