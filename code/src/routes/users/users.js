import express from "express";
import { sequelize, User, Evaluate } from "../../db/sequelize.js";
import { success } from "../../helper.js";
import bcrypt from "bcrypt";

const userRouter = express.Router();

//Enregistrement d'un nouvel utilisateur
userRouter.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;
    //Hachage du mot de passe
    const hashed_password = await bcrypt.hash(password, 10);
    const isAdmin = false;
    const userData = { hashed_password, username, isAdmin };
    const user = await User.create(userData);
    res
      .status(201)
      .json(success(`Le livre ${user.username} a bien été créé !`, user));
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la création du user.", data: error });
  }
});

// Create a test user if it doesn't exist
userRouter.post("/test", async (req, res) => {
  try {
    const testUser = await User.create({
      username: "testuser",
      hashed_password: await bcrypt.hash("password123", 10),
      isAdmin: false,
    });
    res.status(201).json(success("Test user created successfully", testUser));
  } catch (error) {
    res.status(500).json({ message: "Error creating test user", data: error });
  }
});

//Obtenir une liste de tous les utilisateurs
userRouter.get("/", async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["utilisateur_id", "username", "isAdmin"], // Don't send password
    });
    res.json(success("Users retrieved successfully", users));
  } catch (error) {
    res.status(500).json({ message: "Error retrieving users", data: error });
  }
});
userRouter.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User introuvable." });
    }

    await user.destroy();
    res.json(success("User supprimé avec succès."));
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression.", data: error });
  }
});

//Ajout d'un commentaire par utilisateur
userRouter.post("/:id/comments", async (req, res) => {
  try {
    const { book_id, content } = req.body;

    await sequelize.query(
      "INSERT INTO comments (user_id, book_id, content) VALUES (?, ?, ?)",
      {
        replacements: [req.params.id, book_id, content],
        type: sequelize.QueryTypes.INSERT,
      }
    );

    const newComment = await Evaluate.create({
      user_id: req.params.id, // Get the user_id from the URL parameter
      book_id: req.body.book_id, // Get the book_id from the request body
      content: req.body.content, // Get the content from the request body
    }); //versino sequelize

    res.status(201).json({ message: "Comment added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Database error" });
  }
});

export default userRouter;
