import express from "express";
import { sequelize, Book } from "../../db/sequelize.js";
import { auth } from "../../controller/auth/auth.js";
import { success } from "../helper.js";
const bookRouter = express();

bookRouter.post(
  "/",
  /*auth,*/ (req, res) => {
    Book.create(req.body)
      .then((createdBook) => {
        // Définir un message pour le consommateur de l'API REST
        const message = `Le produit ${createdBook.titre} a bien été créé !`;
        // Retourner la réponse HTTP en json avec le msg et le produit créé
        res.json(success(message, createdBook));
      })
      .catch((error) => {
        /*if (error instanceof ValidationError) {
          return res.status(400).json({ message: error.message, data: error });
        }*/
        const message =
          "Le produit n'a pas pu être ajouté. Merci de réessayer dans quelques instants.";
        res.status(500).json({ message, data: error });
      });
  }
);
bookRouter.get(
  "/",
  /*auth,*/ (req, res) => {
    if (req.query.name) {
      if (req.query.name.length < 2) {
        const message = `Le terme de la recherche doit contenir au moins 2 caractères`;
        return res.status(400).json({ message });
      }
      let limit = 3;
      if (req.query.limit) {
        limit = parseInt(req.query.limit);
      }
      return Product.findAndCountAll({
        where: { titre: { [Op.like]: `%${req.query.name}%` } },
        order: ["titre"],
        limit: limit,
      }).then((books) => {
        const message = `Il y a ${books.count} produits qui correspondent au terme de la recherche`;
        res.json(success(message, books));
      });
    }
    Book.findAll({ order: ["livre_id"] })
      .then((books) => {
        const message = "La liste des produits a bien été récupérée.";
        res.json(success(message, books));
      })
      .catch((error) => {
        const message =
          "La liste des produits n'a pas pu être récupérée. Merci de réessayer dans quelques instants.";
        res.status(500).json({ message, data: error });
      });
  }
);

bookRouter.get(
  "/:id",
  /*auth,*/ (req, res) => {
    Book.findByPk(req.params.id)
      .then((book) => {
        if (book === null) {
          const message =
            "Le produit demandé n'existe pas. Merci de réessayer avec un autre identifiant.";
          // A noter ici le return pour interrompre l'exécution du code
          return res.status(404).json({ message });
        }

        const message = `Le produit dont l'id vaut ${book.livre_id} a bien été récupéré.`;
        res.json(success(message, book));
      })
      .catch((error) => {
        const message =
          "Le produit n'a pas pu être récupéré. Merci de réessayer dans quelques instants.";
        res.status(500).json({ message, data: error });
      });
  }
);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*router.get("/", async (req, res) => {
  try {
    const books = await sequelize.query("SELECT * FROM books", {
      type: sequelize.QueryTypes.SELECT,
    });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Database error" });
  }
});

/*router.get("/:id", async (req, res) => {
  try {
    const book = await sequelize.query("SELECT * FROM books WHERE id = ?", {
      replacements: [req.params.id],
      type: sequelize.QueryTypes.SELECT,
    });

    if (!book.length)
      return res.status(404).json({ message: "Book not found" });

    res.json(book[0]);
  } catch (error) {
    res.status(500).json({ message: "Database error" });
  }
});*/

/*router.post("/", async (req, res) => {
  try {
    const { title, author_id, category_id } = req.body;
    await sequelize.query(
      "INSERT INTO books (title, author_id, category_id) VALUES (?, ?, ?)",
      {
        replacements: [title, author_id, category_id],
        type: sequelize.QueryTypes.INSERT,
      }
    );

    res.status(201).json({ message: "Book added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Database error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { title, author_id, category_id } = req.body;
    const [updated] = await sequelize.query(
      "UPDATE books SET title=?, author_id=?, category_id=? WHERE id=?",
      {
        replacements: [title, author_id, category_id, req.params.id],
        type: sequelize.QueryTypes.UPDATE,
      }
    );

    if (!updated) return res.status(404).json({ message: "Book not found" });

    res.json({ message: "Book updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Database error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await sequelize.query("DELETE FROM books WHERE id=?", {
      replacements: [req.params.id],
      type: sequelize.QueryTypes.DELETE,
    });

    if (!deleted) return res.status(404).json({ message: "Book not found" });

    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Database error" });
  }
});*/
export default bookRouter;
