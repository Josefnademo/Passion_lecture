import { sequelize } from "../db/sequelize.js";
import { success } from "../helper.js";

export const getAllAuthors = async (req, res) => {
  try {
    const authors = await sequelize.models.t_ecrivain.findAll({
      attributes: ["ecrivain_id", "prenom", "nom_de_famille"],
      order: [
        ["nom_de_famille", "ASC"],
        ["prenom", "ASC"],
      ],
    });

    console.log("Found authors:", authors.length);
    res.json(success("Authors retrieved successfully", authors));
  } catch (error) {
    console.error("Error in getAllAuthors:", error);
    res.status(500).json({
      message: "Error retrieving authors",
      error: error.message,
    });
  }
};

export const getAuthorById = async (req, res) => {
  try {
    const author = await sequelize.models.t_ecrivain.findByPk(req.params.id, {
      attributes: ["ecrivain_id", "prenom", "nom_de_famille"],
    });

    if (!author) {
      return res.status(404).json({
        message: "Author not found",
        data: { author_id: req.params.id },
      });
    }

    res.json(
      success(`Author ${author.prenom} ${author.nom_de_famille} found`, author)
    );
  } catch (error) {
    console.error("Error in getAuthorById:", error);
    res.status(500).json({
      message: "Error retrieving author",
      error: error.message,
      author_id: req.params.id,
    });
  }
};

export const getBooksByAuthor = async (req, res) => {
  try {
    console.log("Fetching books for author ID:", req.params.id);

    // First check if the author exists
    const author = await sequelize.models.t_ecrivain.findByPk(req.params.id);
    if (!author) {
      return res.status(404).json({
        message: "Author not found",
        data: { author_id: req.params.id },
      });
    }

    const books = await sequelize.models.t_livre.findAll({
      where: { writer_id: req.params.id },
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
    res.json(
      success(
        `Books found for author ${author.prenom} ${author.nom_de_famille}`,
        books
      )
    );
  } catch (error) {
    console.error("Error in getBooksByAuthor:", error);
    res.status(500).json({
      message: "Error retrieving books by author",
      error: error.message,
      author_id: req.params.id,
    });
  }
};
