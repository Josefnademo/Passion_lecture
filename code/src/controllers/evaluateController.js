import { sequelize } from "../db/sequelize.js";
import { success } from "../helper.js";

export const addEvaluation = async (req, res) => {
  try {
    console.log("Request params:", req.params);
    console.log("Request body:", req.body);

    // Verify user exists
    const user = await sequelize.models.t_user.findByPk(req.body.user_id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        data: { user_id: req.body.user_id },
      });
    }

    // Verify book exists
    const book = await sequelize.models.t_livre.findByPk(req.params.bookId);
    if (!book) {
      return res.status(404).json({
        message: "Book not found",
        data: { book_id: req.params.bookId },
      });
    }

    const evaluation = await sequelize.models.t_evaluer.create({
      commentaire: req.body.commentaire,
      note: req.body.note,
      user_id: parseInt(req.body.user_id),
      book_id: parseInt(req.params.bookId),
    });

    console.log("Created evaluation:", evaluation.toJSON());

    res.status(201).json(success("Evaluation added successfully", evaluation));
  } catch (error) {
    console.error("Error in addEvaluation:", error);
    res.status(500).json({
      message: "Error adding evaluation",
      error: error.message,
      requestData: {
        params: req.params,
        body: req.body,
      },
    });
  }
};

export const getEvaluations = async (req, res) => {
  try {
    console.log("Request params:", req.params);

    const evaluations = await sequelize.models.t_evaluer.findAll({
      where: { book_id: parseInt(req.params.bookId) },
      include: [
        {
          model: sequelize.models.t_user,
          as: "user",
          attributes: ["username"],
        },
      ],
    });
    res.json(success("Evaluations retrieved successfully", evaluations));
  } catch (error) {
    console.error("Error in getEvaluations:", error);
    res.status(500).json({
      message: "Error retrieving evaluations",
      error: error.message,
      requestData: {
        params: req.params,
      },
    });
  }
};
