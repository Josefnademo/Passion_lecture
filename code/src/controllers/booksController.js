import { Book } from "../db/sequelize.js";
import { Op } from "sequelize";
//import { success } from "../helper.js";

const bookController = {
  // Create a new book
  async createBook(req, res) {
    try {
      const book = await Book.create(req.body);
      res
        .status(201)
        .json(success(`Le livre ${book.titre} a bien été créé !`, book));
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erreur lors de la création du livre.", data: error });
    }
  },

  // Get all books or search by title
  async getAllBooks(req, res) {
    try {
      const { name, limit = 3 } = req.query;
      let books;

      if (name && name.length >= 2) {
        books = await Book.findAndCountAll({
          where: { titre: { [Op.like]: `%${name}%` } },
          order: [["titre", "ASC"]],
          limit: parseInt(limit),
        });
        return res.json(
          success(
            `Il y a ${books.count} livres correspondant à la recherche.`,
            books
          )
        );
      }

      books = await Book.findAll({ order: [["livre_id", "ASC"]] });
      res.json(success("Liste des livres récupérée avec succès.", books));
    } catch (error) {
      res
        .status(500)
        .json({ message: "Impossible de récupérer les livres.", data: error });
    }
  },

  // Get a book by ID
  async getBookById(req, res) {
    try {
      const book = await Book.findByPk(req.params.id);
      if (!book) {
        return res.status(404).json({ message: "Livre introuvable." });
      }
      res.json(success(`Livre ${book.titre} trouvé.`, book));
    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la récupération du livre.",
        data: error,
      });
    }
  },

  // Update a book
  async updateBook(req, res) {
    try {
      const book = await Book.findByPk(req.params.id);
      if (!book) {
        return res.status(404).json({ message: "Livre introuvable." });
      }

      await book.update(req.body);
      res.json(success("Livre mis à jour avec succès.", book));
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erreur lors de la mise à jour.", data: error });
    }
  },

  // Delete a book
  async deleteBook(req, res) {
    try {
      const book = await Book.findByPk(req.params.id);
      if (!book) {
        return res.status(404).json({ message: "Livre introuvable." });
      }

      await book.destroy();
      res.json(success("Livre supprimé avec succès."));
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erreur lors de la suppression.", data: error });
    }
  },
};

export default bookController;
