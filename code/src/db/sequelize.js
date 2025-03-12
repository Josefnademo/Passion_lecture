import { Sequelize, DataTypes } from "sequelize";
import bcrypt from "bcrypt";
//mocks
import { books as books } from "./mock-book.js";
import { categories as categories } from "./mock-category.js";
import { writers as writers } from "./mock-writer.js";
import { users as users } from "./mock-user.js";
import { evaluations as evaluations } from "./mock-evaluate.js";
//modèles
import { BookModel } from "../model/BookModel.js";
import { CategoryModel } from "../model/CategoryModel.js";
import { WriterModel } from "../model/WriterModel.js";
import { UserModel } from "../model/UserModel.js";
import { EvaluateModel } from "../model/EvaluateModel.js";

const sequelize = new Sequelize(
  "db_books", // Nom de la DB qui doit exister
  "root", // Nom de l'utilisateur
  "root", // Mot de passe de l'utilisateur
  {
    host: "localhost",
    port: "6033",
    dialect: "mysql",
    logging: false,
  }
);
// Le modèle Book
const Book = BookModel(sequelize, DataTypes);
// Le modèle User
const User = UserModel(sequelize, DataTypes);
// Le modèle Category
const Category = CategoryModel(sequelize, DataTypes);
//Le modèle Writer
const Writer = WriterModel(sequelize, DataTypes);
// Le modèle Evaluate
const Evaluate = EvaluateModel(sequelize, DataTypes);

// Initialize associations
const models = {
  t_livre: Book,
  t_user: User,
  t_category: Category,
  t_ecrivain: Writer,
  t_evaluer: Evaluate,
};

Object.values(models)
  .filter((model) => typeof model.associate === "function")
  .forEach((model) => model.associate(models));

let initDb = () => {
  return sequelize
    .sync({ force: true }) // Force la synchro => donc supprime les données également
    .then(async (_) => {
      await importUsers();
      await importCategory();
      await importWriter();
      await importBooks();
      await importEval();

      console.log("La base de données db_books a bien été synchronisée");
    });
};
const importBooks = () => {
  return Promise.all(
    books.map(async (book) => {
      try {
        const createdBook = await Book.create({
          titre: book.titre,
          annee_edition: book.annee_edition,
          nombre_de_page: book.nombre_de_page,
          category_id: book.category_id,
          writer_id: book.writer_id,
        });
        console.log("Created book:", createdBook.toJSON());
        return createdBook;
      } catch (error) {
        console.error("Error creating book:", error);
        throw error;
      }
    })
  );
};

const importUsers = () => {
  return Promise.all(
    users.map(async (user) => {
      try {
        const hash = await bcrypt.hash(user.password, 10);
        const createdUser = await User.create({
          username: user.username,
          hashed_password: hash,
          isAdmin: user.isAdmin,
        });
        console.log("Created user:", createdUser.toJSON());
        return createdUser;
      } catch (error) {
        console.error("Error creating user:", error);
        throw error;
      }
    })
  );
};
const importCategory = () => {
  return Promise.all(
    categories.map(async (category) => {
      try {
        const createdCategory = await Category.create({
          nom: category.nom,
        });
        console.log("Created category:", createdCategory.toJSON());
        return createdCategory;
      } catch (error) {
        console.error("Error creating category:", error);
        throw error;
      }
    })
  );
};
const importWriter = () => {
  return Promise.all(
    writers.map(async (writer) => {
      try {
        const createdWriter = await Writer.create({
          prenom: writer.prenom,
          nom_de_famille: writer.nom_de_famille,
        });
        console.log("Created writer:", createdWriter.toJSON());
        return createdWriter;
      } catch (error) {
        console.error("Error creating writer:", error);
        throw error;
      }
    })
  );
};
const importEval = () => {
  return Promise.all(
    evaluations.map(async (evaluation) => {
      try {
        const createdEval = await Evaluate.create({
          commentaire: evaluation.commentaire,
          note: evaluation.note,
          book_id: evaluation.book_id,
          user_id: evaluation.user_id,
        });
        console.log("Created evaluation:", createdEval.toJSON());
        return createdEval;
      } catch (error) {
        console.error("Error creating evaluation:", error);
        throw error;
      }
    })
  );
};
export {
  sequelize,
  initDb,
  Book,
  importUsers,
  User,
  Category,
  Writer,
  Evaluate,
};
