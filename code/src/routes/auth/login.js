import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { sequelize } from "../../db/sequelize.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;
    const [user] = await sequelize.query(
      "SELECT * FROM users WHERE username = ?",
      {
        replacements: [username],
        type: sequelize.QueryTypes.SELECT,
      }
    );

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user.id }, "yourSecretKey", {
      expiresIn: "24h",
    });

    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Database error" });
  }
});

export default router;
