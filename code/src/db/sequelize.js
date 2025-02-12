import { Sequelize, DataTypes } from "sequelize";
import { books as books } from "./mock-book.js";
import { LivreModel } from "../model/livres.js";
import bcrypt from "bcrypt";
import { UserModel } from "../model/UserModel.js";
const sequelize = new Sequelize(
  "db_books", // Nom de la DB qui doit exister
  "root", // Nom de l'utilisateur
  "root", // Mot de passe de l'utilisateur
  {
    host: "localhost",
    port: "6033", //pour les conteneurs docker MySQL
    dialect: "mysql",
    logging: false,
  }
);
// Le modèle product
const Book = LivreModel(sequelize, DataTypes);

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
      name: book.name,
      price: book.price,
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
        password: hash,
      })
    )
    .then((user) => console.log(user.toJSON()));
};
export { sequelize, initDb, Book as Book, importUsers, User };
