import express from "express";
import bcrypt from "bcrypt";
import { sequelize } from "../../db/sequelize.js";

const router = express.Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
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
 *                 description: The username for the new account
 *               password:
 *                 type: string
 *                 description: The password for the new account
 *               isAdmin:
 *                 type: boolean
 *                 description: Whether the user should be an admin
 *                 default: false
 *     responses:
 *       200:
 *         description: User successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Registration successful
 *       400:
 *         description: Username already taken
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Username already taken
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Database error
 */
router.post("/", async (req, res) => {
  const { username, password } = req.body;
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
        replacements: [username, hashedPassword, false],
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
