// Import des modules
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Book, Category, User } = require("./models");
const router = express.Router();

const SECRET_KEY = "yosef_secret_key"; // À stocker dans un fichier .env

// Middleware d'authentification
const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: "Accès non autorisé" });

  jwt.verify(token.split(" ")[1], SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: "Token invalide" });
    req.user = user;
    next();
  });
};

// ------------------- ROUTES UTILISATEURS ------------------ //
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedPassword });
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Identifiants incorrects" });
    }
    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: "24h" });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ------------------ ROUTES LIVRES ------------------ //
router.get("/books", async (req, res) => {
  const books = await Book.findAll();
  res.json(books);
});

router.get("/books/:id", async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  book ? res.json(book) : res.status(404).json({ message: "Livre non trouvé" });
});

router.post("/books", authenticate, async (req, res) => {
  try {
    const book = await Book.create({ ...req.body, userId: req.user.id });
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put("/books/:id", authenticate, async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  if (!book || book.userId !== req.user.id) {
    return res.status(403).json({ message: "Accès interdit" });
  }
  await book.update(req.body);
  res.json(book);
});

router.delete("/books/:id", authenticate, async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  if (!book || book.userId !== req.user.id) {
    return res.status(403).json({ message: "Accès interdit" });
  }
  await book.destroy();
  res.json({ message: "Livre supprimé" });
});

// ------------------ ROUTES CATÉGORIES ------------------ //
router.get("/categories", async (req, res) => {
  const categories = await Category.findAll();
  res.json(categories);
});

router.get("/categories/:id/books", async (req, res) => {
  const books = await Book.findAll({ where: { categoryId: req.params.id } });
  res.json(books);
});

module.exports = router;
