import { sequelize } from "../db/sequelize.js";
import { success } from "../helper.js";

export const getBooksByCategory = async (req, res) => {
  try {
    const books = await sequelize.models.t_livre.findAll({
      where: { category_id: req.params.id },
      include: [
        {
          model: sequelize.models.t_ecrivain,
          as: "writer",
          attributes: ["prenom", "nom_de_famille"],
        },
      ],
    });
    res.json(success("Books by category retrieved successfully", books));
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving books by category", data: error });
  }
};
