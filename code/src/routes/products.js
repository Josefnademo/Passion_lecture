import express from "express";
import { products } from "../db/mock-product.js";
import { success } from "./helper.js";
import { sequelize, initDb, Book as Book } from "../db/sequelize.js";
import { ValidationError, Op } from "sequelize";
import { auth } from "../auth/auth.js";
const booksRouter = express();

/**
 * @swagger
 * /api/products/:
 *  get:
 *    tags: [Products]
 *    security:
 *      - bearerAuth: []
 *    summary: Retrieve all products.
 *    description: Retrieve all products. Can be used to populate a select HTML tag.
 *    responses:
 *      200:
 *        description: All products.
 *        content:
 *         application/json:
 *          schema:
 *            type: object
 *            properties:
 *              data:
 *                type: object
 *                properties:
 *                  id:
 *                    type: integer
 *                    description: The product ID.
 *                    example: 1
 *                  name:
 *                    type: string
 *                    description: The product's name.
 *                    example: Big Mac
 *                  price:
 *                    type: number
 *                    description: The product's price.
 *                    example: 5.99
 *
 */
booksRouter.get("/", auth, (req, res) => {
  if (req.query.name) {
    if (req.query.name.length < 2) {
      const message = `Le terme de la recherche doit contenir au moins 2 caractères`;
      return res.status(400).json({ message });
    }
    let limit = 3;
    if (req.query.limit) {
      limit = parseInt(req.query.limit);
    }
    return Book.findAndCountAll({
      where: { name: { [Op.like]: `%${req.query.name}%` } },
      order: ["name"],
      limit: limit,
    }).then((books) => {
      const message = `Il y a ${books.count} produits qui correspondent au terme de la recherche`;
      res.json(success(message, books));
    });
  }
  Book.findAll({ order: ["name"] })
    .then((books) => {
      const message = "La liste des produits a bien été récupérée.";
      res.json(success(message, books));
    })
    .catch((error) => {
      const message =
        "La liste des produits n'a pas pu être récupérée. Merci de réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
});

booksRouter.get("/:id", auth, (req, res) => {
  Book.findByPk(req.params.id)
    .then((book) => {
      if (book === null) {
        const message =
          "Le livre demandé n'existe pas. Merci de réessayer avec un autre identifiant.";
        // A noter ici le return pour interrompre l'exécution du code
        return res.status(404).json({ message });
      }
      const message = `Le livre dont l'id vaut ${book.id} a bien été récupéré.`;
      res.json(success(message, book));
    })
    .catch((error) => {
      const message =
        "Le livre n'a pas pu être récupéré. Merci de réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
});

booksRouter.post("/", auth, (req, res) => {
  Book.create(req.body)
    .then((createdBook) => {
      // Définir un message pour le consommateur de l'API REST
      const message = `Le livre ${createdBook.name} a bien été créé !`;
      // Retourner la réponse HTTP en json avec le msg et Le livre créé
      res.json(success(message, createdBook));
    })
    .catch((error) => {
      if (error instanceof ValidationError) {
        return res.status(400).json({ message: error.message, data: error });
      }
      const message =
        "Le livre n'a pas pu être ajouté. Merci de réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
});
booksRouter.delete("/:id", auth, (req, res) => {
  Book.findByPk(req.params.id)
    .then((deletedBook) => {
      if (deletedBook === null) {
        const message =
          "Le livre demandé n'existe pas. Merci de réessayer avec un autre identifiant.";
        // A noter ici le return pour interrompre l'exécution du code
        return res.status(404).json({ message });
      }
      return Book.destroy({
        where: { id: deletedBook.id },
      }).then((_) => {
        // Définir un message pour le consommateur de l'API REST
        const message = `Le livre ${deletedBook.name} a bien été supprimé !`;
        // Retourner la réponse HTTP en json avec le msg et Le livre créé
        res.json(success(message, deletedBook));
      });
    })
    .catch((error) => {
      const message =
        "Le livre n'a pas pu être supprimé. Merci de réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
});

booksRouter.put("/:id", auth, (req, res) => {
  const bookId = req.params.id;
  Book.update(req.body, { where: { id: bookId } })
    .then((_) => {
      return Book.findByPk(bookId).then((updatedBook) => {
        if (updatedBook === null) {
          const message =
            "Le livre demandé n'existe pas. Merci de réessayer avec un autre identifiant.";
          // A noter ici le return pour interrompre l'exécution du code
          return res.status(404).json({ message });
        }
        // Définir un message pour l'utilisateur de l'API REST
        const message = `Le livre ${updatedBook.name} dont l'id vaut ${updatedBook.id} a été mis à jour avec succès`;
        // Retourner la réponse HTTP en json avec le msg et Le livre créé
        res.json(success(message, updatedBook));
      });
    })
    .catch((error) => {
      const message =
        "Le livre n'a pas pu être mis à jour. Merci de réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
});

export { booksRouter as booksRouter };
