import { sequelize } from "../db/sequelize.js";
import { success } from "../helper.js";

export const getComments = async (req, res) => {
  try {
    const comments = await sequelize.models.t_comment.findAll({
      where: { book_id: req.params.id },
      include: [
        {
          model: sequelize.models.t_user,
          as: "user",
          attributes: ["username"],
        },
      ],
    });
    res.json(success("Comments retrieved successfully", comments));
  } catch (error) {
    res.status(500).json({ message: "Error retrieving comments", data: error });
  }
};

export const addComment = async (req, res) => {
  try {
    const comment = await sequelize.models.t_comment.create({
      content: req.body.content,
      book_id: req.params.id,
      user_id: req.body.user_id,
    });
    res.status(201).json(success("Comment added successfully", comment));
  } catch (error) {
    res.status(500).json({ message: "Error adding comment", data: error });
  }
};

export const getUserComments = async (req, res) => {
  try {
    const comments = await sequelize.models.t_comment.findAll({
      where: { user_id: req.params.id },
      include: [
        {
          model: sequelize.models.t_livre,
          as: "book",
          attributes: ["titre"],
        },
      ],
    });
    res.json(success("User comments retrieved successfully", comments));
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving user comments", data: error });
  }
};

export const addUserComment = async (req, res) => {
  try {
    const comment = await sequelize.models.t_comment.create({
      content: req.body.content,
      book_id: req.body.book_id,
      user_id: req.params.id,
    });
    res.status(201).json(success("User comment added successfully", comment));
  } catch (error) {
    res.status(500).json({ message: "Error adding user comment", data: error });
  }
};
