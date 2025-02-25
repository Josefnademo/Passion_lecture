import express from "express";
import { sequelize, initDb, Book } from "./db/sequelize.js";
import { booksRouter as bookRouter } from "./routes/products.js";
import { loginRouter } from "./routes/login.js";
import { swaggerSpec } from "./swagger.js";
import swaggerUi from "swagger-ui-express";
const app = express();

app.use(express.json());
const port = 9999;

app.use("/api/products", bookRouter);
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

app.use("/api/books/ ", bookRouter);

// Route for handling POST request for registration
app.post("/registration", async (req, res) => {
  const { username, password, role = "user" } = req.body;

  try {
    // Check if the username already exists
    const checkQuery = "SELECT * FROM Users WHERE username = ?";
    db.query(checkQuery, [username], async (err, results) => {
      if (err) {
        console.error(
          "Erreur lors de la vérification du nom d'utilisateur :",
          err
        );
        return res.status(500).send("Erreur de base de données");
      }

      // If the username already exists, return an error message
      if (results.length > 0) {
        return res.status(400).send("Ce nom d'utilisateur est déjà pris");
      }

      try {
        // Generating salt for bcrypt
        const salt = await bcrypt.genSalt(4); // `4 — number of turns of the algorithm`

        // Password Hashing(even if two users have the same password, their hashes will be different.)
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insert data into the database (with encrypted password)
        const query =
          "INSERT INTO Users (username, password, role) VALUES (?, ?, ?)";
        db.query(query, [username, hashedPassword, role], (err, results) => {
          //error: Database error
          if (err) {
            console.error("Erreur lors de l'ajout de l'utilisateur :", err);
            return res.status(500).send("Erreur de base de données");
          }

          // After successful registration,send message
          res.json({ message: "Registration réussie ✅" });
        });
      } catch (err) {
        console.error("Erreur lors du hachage du mot de passe :", err);
        res.status(500).send("Erreur lors du hachage du mot de passe");
      }
    });
  } catch (err) {
    console.error("Erreur lors du traitement de la demande :", err);
    res.status(500).send("Erreur lors du traitement de la demande");
  }
});

// Route for handling POST request for login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Query to get the user by username
    const query = "SELECT * FROM Users WHERE username = ?";

    db.query(query, [username], async (err, results) => {
      // Error: Database query error
      if (err) {
        console.error("Erreur lors de la recherche de l'utilisateur :", err);
        return res.status(500).send("Erreur de base de données");
      }

      // If no user found
      if (results.length === 0) {
        return res.status(400).send("Utilisateur ou mot de passe incorrect");
      }

      const user = results[0];

      // Compare the entered password with the stored hashed password
      const match = await bcrypt.compare(password, user.password);

      // If password doesn't match
      if (!match) {
        return res.status(400).send("Utilisateur ou mot de passe incorrect");
      }

      // If login is successful, you can generate a JWT token or set a session
      const token = jwt.sign({ userId: user.id }, "yourSecretKey", {
        expiresIn: "1000h",
      });

      // Send the token as a response or redirect
      res.json({ message: "Connexion réussie ✅", token });
    });
  } catch (err) {
    console.error("Erreur lors de la tentative de connexion :", err);
    res.status(500).send("Erreur lors de la tentative de connexion");
  }
});

app.use(({ res }) => {
  const message =
    "Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL.";
  res.status(404).json(message);
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
