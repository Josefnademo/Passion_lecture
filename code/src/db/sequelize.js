import { Sequelize, DataTypes } from "sequelize";
import { books as books } from "./mock-book.js";
import { categories } from "./mock-category.js";
import { BookModel } from "../model/BookModel.js";
import { CategoryModel } from "../model/CategoryModel.js";
import { WriterModel } from "../model/WriterModel.js";
import { UserModel } from "../model/UserModel.js";
import { EvaluateModel } from "../model/EvaluateModel.js";
import bcrypt from "bcrypt";
const sequelize = new Sequelize(
  "db_books_test", // Nom de la DB qui doit exister
  "root", // Nom de l'utilisateur
  "root", // Mot de passe de l'utilisateur
  {
    host: "localhost",
    port: "6033", //pour les conteneurs docker MySQL
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
let initDb = () => {
  return sequelize
    .sync({ force: true }) // Force la synchro => donc supprime les données également
    .then((_) => {
      importBooks();
      importUsers();
      importCategory();
      console.log("La base de données db_books a bien été synchronisée");
    });
};
const importBooks = () => {
  // import tous les produits présents dans le fichier db/mock-product
  books.map((book) => {
    //equivalent insert into
    Book.create({
      titre: book.titre,
      annee_edition: book.annee_edition,
      nombre_de_page: book.nombre_de_page,
    }).then((book) => console.log(book.toJSON()));
  });
};

const importUsers = () => {
  bcrypt
    .hash("etml", 10) // temps pour hasher = du sel
    .then((hash) =>
      User.create({
        username: "etml",
        hashed_password: hash,
        isAdmin: false,
      })
    )
    .then((user) => console.log(user.toJSON()));
};
const importCategory = () => {
  //equivalent insert into
  categories.map((category) => {
    Category.create({
      nom: category.nom,
    });
  });
};
export { sequelize, initDb, Book as Book, importUsers, User };
