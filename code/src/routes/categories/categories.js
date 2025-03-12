import express from "express";
import { sequelize } from "../../db/sequelize.js";
import { Category } from "../../db/sequelize.js";
import { Op } from "sequelize";

const router = express.Router();

/**
 * @swagger
 * /api/categories:
 *   get:
 *     tags: [Categories]
 *     summary: Get all categories
 *     description: Retrieve a list of all book categories
 *     responses:
 *       200:
 *         description: List of categories retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   categorie_id:
 *                     type: integer
 *                   nom:
 *                     type: string
 *                   created:
 *                     type: string
 *                     format: date-time
 *                   updated:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Database error
 */
router.get("/", async (req, res) => {
  try {
    const categories = await Category.findAll();
    console.log(categories);
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Database error" });
  }
});

/**
 * @swagger
 * /api/categories/{id}:
 *   get:
 *     tags: [Categories]
 *     summary: Get a category by ID
 *     description: Retrieve a specific category by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Category found and returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 categorie_id:
 *                   type: integer
 *                 nom:
 *                   type: string
 *                 created:
 *                   type: string
 *                   format: date-time
 *                 updated:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Category not found
 *       500:
 *         description: Server error
 */
router.get("/:id", async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving category",
      error: error.message,
    });
  }
});

export default router;
