import { sequelize } from "../db/sequelize.js";

export const addNote = async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Content is required" });
    }

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
};
