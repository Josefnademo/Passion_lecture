import express from "express";
import bookController from "../../controllers/booksController.js";
import { auth } from "../../controllers/auth/auth.js";

const router = express.Router();

/**
 * @swagger
 * /api/books:
 *   post:
 *     tags: [Books]
 *     summary: Create a new book
 *     description: Add a new book to the library
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titre
 *               - annee_edition
 *               - nombre_de_page
 *               - category_id
 *               - writer_id
 *             properties:
 *               titre:
 *                 type: string
 *                 description: The book's title
 *               annee_edition:
 *                 type: integer
 *                 description: Publication year
 *                 maximum: 2025
 *               lien_image:
 *                 type: string
 *                 description: URL to book cover image
 *               lien_pdf:
 *                 type: string
 *                 description: URL to PDF version
 *               resume:
 *                 type: string
 *                 description: Book summary
 *               editeur:
 *                 type: string
 *                 description: Publisher name
 *               nombre_de_page:
 *                 type: integer
 *                 minimum: 1
 *                 description: Number of pages
 *               category_id:
 *                 type: integer
 *                 description: Category ID reference
 *               writer_id:
 *                 type: integer
 *                 description: Writer ID reference
 *     responses:
 *       201:
 *         description: Book created successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post("/", auth, bookController.createBook);

/**
 * @swagger
 * /api/books:
 *   get:
 *     tags: [Books]
 *     summary: Get all books
 *     description: Retrieve a list of all books in the library
 *     responses:
 *       200:
 *         description: List of books retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 *       500:
 *         description: Server error
 */
router.get("/", bookController.getAllBooks);

/**
 * @swagger
 * /api/books/{id}:
 *   get:
 *     tags: [Books]
 *     summary: Get a book by ID
 *     description: Retrieve a specific book by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Book ID
 *     responses:
 *       200:
 *         description: Book found and returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: Book not found
 *       500:
 *         description: Server error
 */
router.get("/:id", bookController.getBookById);

/**
 * @swagger
 * /api/books/{id}:
 *   put:
 *     tags: [Books]
 *     summary: Update a book
 *     description: Update an existing book's information
 *     security:
 *       - bearerAuth: []
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
 *             properties:
 *               titre:
 *                 type: string
 *               annee_edition:
 *                 type: integer
 *                 maximum: 2025
 *               lien_image:
 *                 type: string
 *               lien_pdf:
 *                 type: string
 *               resume:
 *                 type: string
 *               editeur:
 *                 type: string
 *               nombre_de_page:
 *                 type: integer
 *                 minimum: 1
 *               category_id:
 *                 type: integer
 *               writer_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Book updated successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Book not found
 *       500:
 *         description: Server error
 */
router.put("/:id", bookController.updateBook);

/**
 * @swagger
 * /api/books/{id}:
 *   delete:
 *     tags: [Books]
 *     summary: Delete a book
 *     description: Remove a book from the library
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Book ID
 *     responses:
 *       200:
 *         description: Book deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Book not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", bookController.deleteBook);
export default router;
