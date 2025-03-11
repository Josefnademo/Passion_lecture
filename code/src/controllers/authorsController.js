import { sequelize } from "../db/sequelize.js";
import { success } from "../helper.js";

export const getBooksByAuthor = async (req, res) => {
  try {
    const books = await sequelize.models.t_livre.findAll({
      where: { writer_id: req.params.id },
      include: [
        {
          model: sequelize.models.t_category,
          as: "category",
          attributes: ["nom"],
        },
      ],
    });
    res.json(success("Books by author retrieved successfully", books));
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving books by author", data: error });
  }
};
