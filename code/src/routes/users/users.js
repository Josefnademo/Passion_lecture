import express from "express";
import { sequelize, User, Evaluate } from "../../db/sequelize.js";
import { success } from "../../helper.js";
import bcrypt from "bcrypt";

const userRouter = express.Router();

/**
 * @swagger
 * /api/users:
 *   post:
 *     tags: [Users]
 *     summary: Create a new user
 *     description: Register a new user in the system
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
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 utilisateur_id:
 *                   type: integer
 *                 username:
 *                   type: string
 *                 isAdmin:
 *                   type: boolean
 *       400:
 *         description: Username already exists
 *       500:
 *         description: Server error
 */
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

/**
 * @swagger
 * /api/users/test:
 *   post:
 *     tags: [Users]
 *     summary: Create a test user
 *     description: Create a test user if it doesn't exist
 *     responses:
 *       201:
 *         description: Test user created successfully
 *       200:
 *         description: Test user already exists
 *       500:
 *         description: Server error
 */
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

/**
 * @swagger
 * /api/users:
 *   get:
 *     tags: [Users]
 *     summary: Get all users
 *     description: Retrieve a list of all registered users
 *     responses:
 *       200:
 *         description: List of users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   utilisateur_id:
 *                     type: integer
 *                   username:
 *                     type: string
 *                   isAdmin:
 *                     type: boolean
 *       500:
 *         description: Server error
 */
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

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     tags: [Users]
 *     summary: Get a user by ID
 *     description: Retrieve a specific user by their ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *     responses:
 *       200:
 *         description: User found and returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 utilisateur_id:
 *                   type: integer
 *                 username:
 *                   type: string
 *                 isAdmin:
 *                   type: boolean
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
userRouter.get("/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(
      success("User retrieved successfully", {
        utilisateur_id: user.utilisateur_id,
        username: user.username,
        isAdmin: user.isAdmin,
      })
    );
  } catch (error) {
    console.error("Error retrieving user:", error);
    res.status(500).json({
      message: "Error retrieving user",
      error: error.message,
    });
  }
});

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     tags: [Users]
 *     summary: Update a user
 *     description: Update an existing user's information
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *                 format: password
 *               isAdmin:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: User updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
userRouter.put("/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { username, password, isAdmin } = req.body;

    if (username) {
      user.username = username;
    }
    if (password) {
      user.hashed_password = await bcrypt.hash(password, 10);
    }
    if (isAdmin !== undefined) {
      user.isAdmin = isAdmin;
    }

    await user.save();

    res.json(
      success("User updated successfully", {
        utilisateur_id: user.utilisateur_id,
        username: user.username,
        isAdmin: user.isAdmin,
      })
    );
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({
      message: "Error updating user",
      error: error.message,
    });
  }
});

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     tags: [Users]
 *     summary: Delete a user
 *     description: Delete a user and all their associated evaluations
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
userRouter.delete("/:id", async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const userId = req.params.id;

    // Check if user exists
    const user = await User.findByPk(userId);
    if (!user) {
      await t.rollback();
      return res.status(404).json({ message: "User not found" });
    }

    // Delete all evaluations by this user
    await Evaluate.destroy({
      where: { user_id: userId },
      transaction: t,
    });

    // Delete the user
    await User.destroy({
      where: { utilisateur_id: userId },
      transaction: t,
    });

    await t.commit();
    res.json({
      message: "User and associated evaluations deleted successfully",
    });
  } catch (error) {
    await t.rollback();
    console.error("Error deleting user:", error);
    res.status(500).json({
      message: "Error deleting user",
      error: error.message,
    });
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
