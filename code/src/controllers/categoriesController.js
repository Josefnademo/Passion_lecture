import { sequelize } from "../db/sequelize.js";
import { success } from "../helper.js";

export const getBooksByCategory = async (req, res) => {
  try {
    console.log("Fetching books for category ID:", req.params.id);

    // First check if the category exists
    const category = await sequelize.models.t_category.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({
        message: "Category not found",
        data: { category_id: req.params.id },
      });
    }

    const books = await sequelize.models.t_livre.findAll({
      where: { category_id: req.params.id },
      include: [
        {
          model: sequelize.models.t_ecrivain,
          as: "writer",
          attributes: ["prenom", "nom_de_famille"],
        },
        {
          model: sequelize.models.t_category,
          as: "category",
          attributes: ["nom"],
        },
      ],
    });

    console.log("Found books:", books.length);
    res.json(success(`Books found for category ${category.nom}`, books));
  } catch (error) {
    console.error("Error in getBooksByCategory:", error);
    res.status(500).json({
      message: "Error retrieving books by category",
      error: error.message,
      category_id: req.params.id,
    });
  }
};
