import express from "express";
import { sequelize, User, Evaluate } from "../../db/sequelize.js";
import { success } from "../../helper.js";
import bcrypt from "bcrypt";

const userRouter = express.Router();

//Enregistrement d'un nouvel utilisateur
userRouter.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    //Hachage du mot de passe
    const hashed_password = await bcrypt.hash(password, 10);
    const isAdmin = false;
    const userData = { hashed_password, username, isAdmin };

    const user = await User.create(userData);
    console.log("Created new user:", {
      id: user.utilisateur_id,
      username: user.username,
    });

    res.status(201).json(
      success("User created successfully", {
        utilisateur_id: user.utilisateur_id,
        username: user.username,
        isAdmin: user.isAdmin,
      })
    );
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({
      message: "Error creating user",
      error: error.message,
    });
  }
});

// Create a test user if it doesn't exist
userRouter.post("/test", async (req, res) => {
  try {
    // Check if test user already exists
    const existingUser = await User.findOne({
      where: { username: "testuser" },
    });

    if (existingUser) {
      return res.json(
        success("Test user already exists", {
          utilisateur_id: existingUser.utilisateur_id,
          username: existingUser.username,
          isAdmin: existingUser.isAdmin,
        })
      );
    }

    const testUser = await User.create({
      username: "testuser",
      hashed_password: await bcrypt.hash("password123", 10),
      isAdmin: false,
    });

    console.log("Created test user:", {
      id: testUser.utilisateur_id,
      username: testUser.username,
    });

    res.status(201).json(
      success("Test user created successfully", {
        utilisateur_id: testUser.utilisateur_id,
        username: testUser.username,
        isAdmin: testUser.isAdmin,
      })
    );
  } catch (error) {
    console.error("Error creating test user:", error);
    res.status(500).json({
      message: "Error creating test user",
      error: error.message,
    });
  }
});

// Get all users
userRouter.get("/", async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["utilisateur_id", "username", "isAdmin"],
    });
    console.log("Current users in database:", users);
    res.json(success("Users retrieved successfully", users));
  } catch (error) {
    console.error("Error getting users:", error);
    res.status(500).json({
      message: "Error retrieving users",
      error: error.message,
    });
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
