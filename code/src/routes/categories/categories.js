import express from "express";
import { sequelize } from "../../db/sequelize.js";
import { Category } from "../../db/sequelize.js";
import { Op } from "sequelize";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const categories = await Category.findAll();
    console.log(categories);
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Database error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Categorie est introuvable." });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération de category.",
      data: error,
    });
  }
});

export default router;
