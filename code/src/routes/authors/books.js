import express from "express";
import {
  getBooksByAuthor,
  getAllAuthors,
  getAuthorById,
} from "../../controllers/authorsController.js";

const router = express.Router({ mergeParams: true });

/**
 * @swagger
 * /api/authors:
 *   get:
 *     tags: [Authors]
 *     summary: Get all authors
 *     description: Retrieve a list of all authors/writers
 *     responses:
 *       200:
 *         description: List of authors retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   ecrivain_id:
 *                     type: integer
 *                   prenom:
 *                     type: string
 *                   nom_de_famille:
 *                     type: string
 *                   created:
 *                     type: string
 *                     format: date-time
 *                   updated:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Server error
 */
router.get("/", getAllAuthors);

/**
 * @swagger
 * /api/authors/{id}:
 *   get:
 *     tags: [Authors]
 *     summary: Get an author by ID
 *     description: Retrieve a specific author by their ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Author ID
 *     responses:
 *       200:
 *         description: Author found and returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ecrivain_id:
 *                   type: integer
 *                 prenom:
 *                   type: string
 *                 nom_de_famille:
 *                   type: string
 *                 created:
 *                   type: string
 *                   format: date-time
 *                 updated:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Author not found
 *       500:
 *         description: Server error
 */
router.get("/:id", getAuthorById);

/**
 * @swagger
 * /api/authors/{id}/books:
 *   get:
 *     tags: [Authors]
 *     summary: Get all books by an author
 *     description: Retrieve all books written by a specific author
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Author ID
 *     responses:
 *       200:
 *         description: List of books retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 *       404:
 *         description: Author not found
 *       500:
 *         description: Server error
 */
router.get("/:id/books", getBooksByAuthor);

export default router;
