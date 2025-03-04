import express from "express";
import { sequelize } from "../../db/sequelize.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const books = await sequelize.query("SELECT * FROM books", {
      type: sequelize.QueryTypes.SELECT,
    });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Database error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const book = await sequelize.query("SELECT * FROM books WHERE id = ?", {
      replacements: [req.params.id],
      type: sequelize.QueryTypes.SELECT,
    });

    if (!book.length)
      return res.status(404).json({ message: "Book not found" });

    res.json(book[0]);
  } catch (error) {
    res.status(500).json({ message: "Database error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, author_id, category_id } = req.body;
    await sequelize.query(
      "INSERT INTO books (title, author_id, category_id) VALUES (?, ?, ?)",
      {
        replacements: [title, author_id, category_id],
        type: sequelize.QueryTypes.INSERT,
      }
    );

    res.status(201).json({ message: "Book added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Database error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { title, author_id, category_id } = req.body;
    const [updated] = await sequelize.query(
      "UPDATE books SET title=?, author_id=?, category_id=? WHERE id=?",
      {
        replacements: [title, author_id, category_id, req.params.id],
        type: sequelize.QueryTypes.UPDATE,
      }
    );

    if (!updated) return res.status(404).json({ message: "Book not found" });

    res.json({ message: "Book updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Database error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await sequelize.query("DELETE FROM books WHERE id=?", {
      replacements: [req.params.id],
      type: sequelize.QueryTypes.DELETE,
    });

    if (!deleted) return res.status(404).json({ message: "Book not found" });

    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Database error" });
  }
});

export default router;
