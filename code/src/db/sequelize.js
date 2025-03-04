import { Sequelize, DataTypes } from "sequelize";
import { books as books } from "./mock-book.js";
import { BookModel } from "../model/BookModel.js";
import bcrypt from "bcrypt";
import { UserModel } from "../model/UserModel.js";
const sequelize = new Sequelize(
  "db_books_test", // Nom de la DB qui doit exister
  "root", // Nom de l'utilisateur
  "root", // Mot de passe de l'utilisateur
  {
    host: "localhost",
    port: "6033",
    dialect: "mysql",
    logging: false,
  }
);
// Le modèle product
const Book = BookModel(sequelize, DataTypes);

let initDb = () => {
  return sequelize
    .sync({ force: true }) // Force la synchro => donc supprime les données également
    .then((_) => {
      importBooks();
      importUsers();
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
const User = UserModel(sequelize, DataTypes);

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
export { sequelize, initDb, Book as Book, importUsers, User };
