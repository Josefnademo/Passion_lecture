import express from "express";
import bcrypt from "bcrypt";
import { sequelize } from "../../db/sequelize.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { username, password, isAdmin = false } = req.body;

  try {
    const [existingUser] = await sequelize.query(
      "SELECT * FROM t_utilisateur WHERE username = ?",
      {
        replacements: [username],
        type: sequelize.QueryTypes.SELECT,
      }
    );

    if (existingUser) {
      return res.status(400).json({ message: "Username already taken" });
    }

    const salt = await bcrypt.genSalt(4);
    const hashedPassword = await bcrypt.hash(password, salt);

    await sequelize.query(
      "INSERT INTO t_utilisateur (username, hashed_password, date_creation, is_admin) VALUES (?, ?, NOW(), ?)",
      {
        replacements: [username, hashedPassword, isAdmin],
        type: sequelize.QueryTypes.INSERT,
      }
    );

    res.json({ message: "Registration successful" });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Database error" });
  }
});

export default router;
