import express from "express";
import { sequelize } from "../../db/sequelize.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const categories = await sequelize.query("SELECT * FROM categories", {
      type: sequelize.QueryTypes.SELECT,
    });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Database error" });
  }
});

router.get("/:id/books", async (req, res) => {
  try {
    const books = await sequelize.query(
      "SELECT * FROM books WHERE category_id = ?",
      {
        replacements: [req.params.id],
        type: sequelize.QueryTypes.SELECT,
      }
    );

    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Database error" });
  }
});

export default router;
