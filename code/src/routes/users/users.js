import express from "express";
import { sequelize, User } from "../../db/sequelize.js";
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

//Obtenir une liste de tous les utilisateurs
userRouter.get("/", async (req, res) => {
  try {
    let users;
    users = await User.findAll({
      order: [["utilisateur_id"]],
    });
    res.json(success("Liste des user récupérée avec succès.", users));
  } catch (error) {
    res
      .status(500)
      .json({ message: "Impossible de récupérer les users.", data: error });
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

    /*const newComment = await Comment.create({
  user_id: req.params.id,     // Get the user_id from the URL parameter
  book_id: req.body.book_id,  // Get the book_id from the request body
  content: req.body.content,  // Get the content from the request body
});  //versino sequelize*/

    res.status(201).json({ message: "Comment added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Database error" });
  }
});

export default userRouter;
