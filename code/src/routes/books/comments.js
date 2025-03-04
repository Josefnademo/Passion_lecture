import express from "express";
import { sequelize } from "../../db/sequelize.js";

const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  try {
    const comments = await sequelize.query(
      "SELECT * FROM comments WHERE book_id = ?",
      {
        replacements: [req.params.id],
        type: sequelize.QueryTypes.SELECT,
      }
    );

    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: "Database error" });
  }
});

export default router;
