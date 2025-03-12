import express from "express";
import { sequelize, initDb, Book } from "./db/sequelize.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger.js";
import bookRouter from "./routes/books/books.js";
import commentRouter from "./routes/books/comments.js";
import noteRouter from "./routes/books/notes.js";
import evaluationRouter from "./routes/books/evaluations.js";
import categoryRouter from "./routes/categories/categories.js";
import categoryBooksRouter from "./routes/categories/books.js";
import authorBooksRouter from "./routes/authors/books.js";
import userRouter from "./routes/users/users.js";
import userCommentsRouter from "./routes/users/comments.js";
import loginRouter from "./routes/auth/login.js";

const app = express();
app.use(express.json());
const port = 9999;

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Book routes
app.use("/api/books", bookRouter);
app.use("/api/books/:bookId/evaluations", evaluationRouter);
app.use("/api/books/:bookId/comments", commentRouter);
app.use("/api/books/:bookId/notes", noteRouter);

// Category routes
app.use("/api/categories", categoryRouter);
app.use("/api/categories", categoryBooksRouter);

// Author routes
app.use("/api/authors", authorBooksRouter);

// User routes
app.use("/api/users", userRouter);
app.use("/api/users/:id/comments", userCommentsRouter);

// Auth routes
app.use("/api/auth/login", loginRouter);

// Initialize database and start server
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("La connexion à la base de données a bien été établie");

    await initDb();
    console.log("Base de données initialisée avec succès");

    app.get("/", (req, res) => {
      res.send("Hello World!");
    });

    app.get("/api/", (req, res) => {
      res.redirect(`http://localhost:${port}/`);
    });

    app.use(({ res }) => {
      const message =
        "Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL.";
      res.status(404).json(message);
    });

    app.listen(port, () => {
      console.log(`Example app listening on port http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
};

startServer();
