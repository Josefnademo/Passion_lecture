import express from "express";
import { sequelize } from "../../db/sequelize.js";
import bcrypt from "bcrypt";

const router = express.Router();

//Enregistrement d'un nouvel utilisateur
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    //Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    //Ajout d'un utilisateur à la base de données
    await sequelize.query(
      "INSERT INTO users (username, password) VALUES (?, ?)",
      {
        replacements: [username, hashedPassword],
        type: sequelize.QueryTypes.INSERT,
      }
    );

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Database error" });
  }
});

//Obtenir une liste de tous les utilisateurs
router.get("/", async (req, res) => {
  try {
    const users = await sequelize.query("SELECT id, username FROM users", {
      type: sequelize.QueryTypes.SELECT,
    });

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Database error" });
  }
});

//Ajout d'un commentaire par utilisateur
router.post("/:id/comments", async (req, res) => {
  try {
    const { book_id, content } = req.body;

    await sequelize.query(
      "INSERT INTO comments (user_id, book_id, content) VALUES (?, ?, ?)",
      {
        replacements: [req.params.id, book_id, content],
        type: sequelize.QueryTypes.INSERT,
      }
    );

    res.status(201).json({ message: "Comment added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Database error" });
  }
});

export default router;
