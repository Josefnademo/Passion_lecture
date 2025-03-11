import express from "express";
import { sequelize, initDb } from "./db/sequelize.js";
import bookRouter from "./routes/books/books.js";
import commentRouter from "./routes/books/comments.js";
import noteRouter from "./routes/books/notes.js";
import categoryRouter from "./routes/categories/categories.js";
import userRouter from "./routes/users/users.js";
import loginRouter from "./routes/auth/login.js";

const app = express();
const port = 9999;

// Middleware to parse JSON bodies
app.use(express.json());

app.use("/api/books", bookRouter);
app.use("/api/books/:id/comments", commentRouter);
app.use("/api/books/:id/notes", noteRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/users", userRouter);
app.use("/api/auth/login", loginRouter);

sequelize
  .authenticate()
  .then(() =>
    console.log("La connexion à la base de données a bien été établie")
  )
  .catch((error) => console.error("Impossible de se connecter à la DB"));

initDb();

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

export default app;
