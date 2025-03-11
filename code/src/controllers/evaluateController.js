import { sequelize } from "../db/sequelize.js";
import { success } from "../helper.js";

export const addEvaluation = async (req, res) => {
  try {
    console.log("Request params:", req.params);
    console.log("Request body:", req.body);

    if (!req.params.bookId) {
      return res.status(400).json({
        message: "Book ID is required",
        data: { params: req.params },
      });
    }

    if (!req.body.user_id) {
      return res.status(400).json({
        message: "User ID is required",
        data: { body: req.body },
      });
    }

    const evaluation = await sequelize.models.t_evaluer.create({
      commentaire: req.body.commentaire,
      note: req.body.note,
      user_id: parseInt(req.body.user_id),
      book_id: parseInt(req.params.bookId),
    });

    res.status(201).json(success("Evaluation added successfully", evaluation));
  } catch (error) {
    console.error("Error in addEvaluation:", error);
    res.status(500).json({
      message: "Error adding evaluation",
      data: error,
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

    if (!req.params.bookId) {
      return res.status(400).json({
        message: "Book ID is required",
        data: { params: req.params },
      });
    }

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
      data: error,
      requestData: {
        params: req.params,
      },
    });
  }
};
