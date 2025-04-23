import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import privateKey from "../../controllers/auth/private_key.js"
import { sequelize } from "../../db/sequelize.js";

const router = express.Router();

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags: [Authentication]
 *     summary: Login user
 *     description: Authenticate a user and return a JWT token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: The user's username
 *               password:
 *                 type: string
 *                 format: password
 *                 description: The user's password
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login successful
 *                 token:
 *                   type: string
 *                   description: JWT token for authentication
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */
router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;
    const [user] = await sequelize.query(
      "SELECT * FROM t_user WHERE username = ?",
      {
        replacements: [username],
        type: sequelize.QueryTypes.SELECT,
      }
    );

    if (!user || !(await bcrypt.compare(password, user.hashed_password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user.utilisateur_id }, privateKey, {
      expiresIn: "24h",
    });

    res.json({ message: "Login successful", token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Database error" });
  }
});

export default router;
