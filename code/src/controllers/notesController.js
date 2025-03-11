import { sequelize } from "../db/sequelize.js";
import { Evaluate } from "../db/sequelize.js";
import { Book } from "../db/sequelize.js";
import { User } from "../db/sequelize.js";
import { Op } from "sequelize";

const NotesController = {
  // Créer une nouvelle évaluation
  async createEvaluation(req, res) {
    try {
      const { commentaire, note, livre_fk, utilisateur_fk } = req.body;

      // Validate that required fields are present
      if (!livre_fk || !utilisateur_fk) {
        return res.status(400).json({
          message: "Les champs livre_fk et utilisateur_fk sont obligatoires.",
        });
      }

      // Vérifier que le livre existe
      const book = await Book.findByPk(livre_fk);
      if (!book) {
        return res.status(404).json({ message: "Livre non trouvé" });
      }

      // Vérifier que l'utilisateur existe
      const user = await User.findByPk(utilisateur_fk);
      if (!user) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }

      const evaluation = await Evaluate.create({
        commentaire,
        note,
        livre_fk,
        utilisateur_fk,
      });

      return res
        .status(201)
        .json({ message: "Évaluation créée avec succès", evaluation });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erreur serveur" });
    }
  },

  // Récupérer toutes les évaluations pour un livre donné
  async getEvaluationsForBook(req, res) {
    try {
      const livreId = req.params.id;

      // Vérifier que le livre existe
      const book = await Book.findByPk(livreId);
      if (!book) {
        return res.status(404).json({ message: "Livre non trouvé" });
      }

      const evaluations = await Evaluate.findAll({
        where: { livre_fk: livreId },
        include: [{ model: User, as: "utilisateur" }],
      });

      return res.status(200).json(evaluations);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erreur serveur" });
    }
  },

  // Récupérer une évaluation par ID
  async getEvaluationById(req, res) {
    try {
      const evaluationId = req.params.id;
      const evaluation = await Evaluate.findByPk(evaluationId);

      if (!evaluation) {
        return res.status(404).json({ message: "Évaluation non trouvée" });
      }

      return res.status(200).json(evaluation);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erreur serveur" });
    }
  },

  // Mettre à jour une évaluation
  async updateEvaluation(req, res) {
    try {
      const evaluationId = req.params.id;
      const { commentaire, note } = req.body;

      const evaluation = await Evaluate.findByPk(evaluationId);
      if (!evaluation) {
        return res.status(404).json({ message: "Évaluation non trouvée" });
      }

      evaluation.commentaire = commentaire || evaluation.commentaire;
      evaluation.note = note || evaluation.note;

      await evaluation.save();

      return res
        .status(200)
        .json({ message: "Évaluation mise à jour avec succès", evaluation });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erreur serveur" });
    }
  },

  // Supprimer une évaluation
  async deleteEvaluation(req, res) {
    try {
      const evaluationId = req.params.id;
      const evaluation = await Evaluate.findByPk(evaluationId);

      if (!evaluation) {
        return res.status(404).json({ message: "Évaluation non trouvée" });
      }

      await evaluation.destroy();

      return res
        .status(200)
        .json({ message: "Évaluation supprimée avec succès" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erreur serveur" });
    }
  },
};

export default NotesController;
