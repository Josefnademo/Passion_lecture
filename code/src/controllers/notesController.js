import { sequelize } from "../db/sequelize.js";
import { Evaluate, Book, User } from "../db/sequelize.js";
import { Op } from "sequelize";

export class NotesController {
  // Get evaluations (notes) for a specific book
  static async getEvaluationsForBook(req, res) {
    try {
      const { book_id } = req.params; // Assuming you're getting it from the route params

      // Make sure book_id is provided
      if (!book_id) {
        return res.status(400).json({ message: "Book ID is required" });
      }

      const evaluations = await Evaluate.findAll({
        where: { book_id },
      });

      return res.status(200).json(evaluations);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: error.message });
    }
  }

  // Create a new evaluation (note)
  static async createEvaluation(req, res) {
    try {
      const { commentaire, note, user_id, book_id } = req.body;

      // Make sure all necessary fields are provided
      if (!book_id) {
        return res.status(400).json({ message: "Book ID is required" });
      }

      const evaluation = await Evaluate.create({
        commentaire,
        note,
        user_id,
        book_id,
      });

      return res.status(201).json(evaluation);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  // Get an evaluation (note) by its ID
  static async getEvaluationById(req, res) {
    try {
      const { noteId } = req.params;

      const evaluation = await Evaluate.findOne({
        where: { id: noteId },
        include: [
          {
            model: Book,
            as: "book",
          },
        ],
      });

      if (!evaluation) {
        return res.status(404).json({ message: "Evaluation not found." });
      }

      return res.json(evaluation);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error." });
    }
  }

  // Update an evaluation (note) by ID
  static async updateEvaluation(req, res) {
    try {
      const { noteId } = req.params;
      const { commentaire, note } = req.body;

      const evaluation = await Evaluate.findOne({
        where: { id: noteId },
      });

      if (!evaluation) {
        return res.status(404).json({ message: "Evaluation not found." });
      }

      evaluation.commentaire = commentaire;
      evaluation.note = note;
      await evaluation.save();

      return res.json(evaluation);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Server error while updating evaluation." });
    }
  }

  // Delete an evaluation (note) by ID
  static async deleteEvaluation(req, res) {
    try {
      const { noteId } = req.params;

      const evaluation = await Evaluate.findOne({
        where: { id: noteId },
      });

      if (!evaluation) {
        return res.status(404).json({ message: "Evaluation not found." });
      }

      await evaluation.destroy();

      return res
        .status(200)
        .json({ message: "Evaluation deleted successfully." });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Server error while deleting evaluation." });
    }
  }
}
