import { sequelize } from "../../db/sequelize.js";

export const getComments = async (req, res) => {
  try {
    const comments = await sequelize.query(
      "SELECT * FROM comments WHERE user_id = ?",
      {
        replacements: [req.params.id],
        type: sequelize.QueryTypes.SELECT,
      }
    );

    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: "Database error" });
  }
};

export const addComment = async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Content is required" });
    }

    await sequelize.query(
      "INSERT INTO comments (user_id, content) VALUES (?, ?)",
      {
        replacements: [req.params.id, content],
        type: sequelize.QueryTypes.INSERT,
      }
    );

    res.status(201).json({ message: "Comment added" });
  } catch (error) {
    res.status(500).json({ message: "Database error" });
  }
};
