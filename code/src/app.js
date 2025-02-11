import express from "express";
import { sequelize, initDb, Product } from "./db/sequelize.js";
import { productsRouter } from "./routes/products.js";
import { loginRouter } from "./routes/login.js";
import { swaggerSpec } from "./swagger.js";
import swaggerUi from "swagger-ui-express";
const app = express();

app.use(express.json());
const port = 3000;

app.use("/api/products", productsRouter);
app.use("/api/login", loginRouter);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, { explorer: true })
);
sequelize
  .authenticate()
  .then((_) =>
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

app.use("/api/products", productsRouter);

app.use(({ res }) => {
  const message =
    "Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL.";
  res.status(404).json(message);
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
