import express from "express";
import { sequelize } from "../../db/sequelize.js";

const router = express.Router({ mergeParams: true });

router.post("/", async (req, res) => {
  try {
    const { content } = req.body;
    await sequelize.query(
      "INSERT INTO notes (book_id, content) VALUES (?, ?)",
      {
        replacements: [req.params.id, content],
        type: sequelize.QueryTypes.INSERT,
      }
    );

    res.status(201).json({ message: "Note added" });
  } catch (error) {
    res.status(500).json({ message: "Database error" });
  }
});

export default router;
