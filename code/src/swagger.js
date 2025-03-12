import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Passion Lecture",
      version: "1.0.0",
      description: "API REST pour la gestion d'une bibliothèque en ligne",
    },
    servers: [
      {
        url: "http://localhost:9999",
        description: "Development server",
      },
    ],
    components: {
      schemas: {
        Book: {
          type: "object",
          required: [
            "titre",
            "annee_edition",
            "nombre_de_page",
            "category_id",
            "writer_id",
          ],
          properties: {
            livre_id: {
              type: "integer",
              description: "L'identifiant unique du livre",
            },
            titre: {
              type: "string",
              description: "Le titre du livre",
            },
            annee_edition: {
              type: "integer",
              description: "L'année d'édition du livre",
            },
            lien_image: {
              type: "string",
              description: "Le lien vers l'image de couverture",
            },
            lien_pdf: {
              type: "string",
              description: "Le lien vers le fichier PDF",
            },
            resume: {
              type: "string",
              description: "Le résumé du livre",
            },
            editeur: {
              type: "string",
              description: "L'éditeur du livre",
            },
            nombre_de_page: {
              type: "integer",
              description: "Le nombre de pages du livre",
            },
            category_id: {
              type: "integer",
              description: "L'identifiant de la catégorie",
            },
            writer_id: {
              type: "integer",
              description: "L'identifiant de l'auteur",
            },
          },
        },
        User: {
          type: "object",
          required: ["username", "hashed_password"],
          properties: {
            utilisateur_id: {
              type: "integer",
              description: "L'identifiant unique de l'utilisateur",
            },
            username: {
              type: "string",
              description: "Le nom d'utilisateur",
            },
            hashed_password: {
              type: "string",
              description: "Le mot de passe hashé",
            },
            isAdmin: {
              type: "boolean",
              description: "Indique si l'utilisateur est administrateur",
            },
          },
        },
        Category: {
          type: "object",
          required: ["nom"],
          properties: {
            categorie_id: {
              type: "integer",
              description: "L'identifiant unique de la catégorie",
            },
            nom: {
              type: "string",
              description: "Le nom de la catégorie",
            },
          },
        },
        Writer: {
          type: "object",
          properties: {
            ecrivain_id: {
              type: "integer",
              description: "L'identifiant unique de l'auteur",
            },
            prenom: {
              type: "string",
              description: "Le prénom de l'auteur",
            },
            nom_de_famille: {
              type: "string",
              description: "Le nom de famille de l'auteur",
            },
          },
        },
        Evaluation: {
          type: "object",
          required: ["note", "user_id", "book_id"],
          properties: {
            id: {
              type: "integer",
              description: "L'identifiant unique de l'évaluation",
            },
            commentaire: {
              type: "string",
              description: "Le commentaire de l'évaluation",
            },
            note: {
              type: "integer",
              description: "La note donnée (0-10)",
            },
            user_id: {
              type: "integer",
              description: "L'identifiant de l'utilisateur",
            },
            book_id: {
              type: "integer",
              description: "L'identifiant du livre",
            },
          },
        },
        Comment: {
          type: "object",
          required: ["content", "user_id", "book_id"],
          properties: {
            comment_id: {
              type: "integer",
              description: "L'identifiant unique du commentaire",
            },
            content: {
              type: "string",
              description: "Le contenu du commentaire",
            },
            user_id: {
              type: "integer",
              description: "L'identifiant de l'utilisateur",
            },
            book_id: {
              type: "integer",
              description: "L'identifiant du livre",
            },
          },
        },
      },
      responses: {
        UnauthorizedError: {
          description: "Accès refusé - Authentication requise",
        },
        NotFoundError: {
          description: "Ressource non trouvée",
        },
      },
    },
    tags: [
      {
        name: "Books",
        description: "Opérations sur les livres",
      },
      {
        name: "Users",
        description: "Opérations sur les utilisateurs",
      },
      {
        name: "Categories",
        description: "Opérations sur les catégories",
      },
      {
        name: "Authors",
        description: "Opérations sur les auteurs",
      },
      {
        name: "Evaluations",
        description: "Opérations sur les évaluations",
      },
      {
        name: "Comments",
        description: "Opérations sur les commentaires",
      },
    ],
    paths: {
      "/api/books": {
        get: {
          tags: ["Books"],
          summary: "Récupérer tous les livres",
          responses: {
            200: {
              description: "Liste des livres récupérée avec succès",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      $ref: "#/components/schemas/Book",
                    },
                  },
                },
              },
            },
          },
        },
        post: {
          tags: ["Books"],
          summary: "Créer un nouveau livre",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Book",
                },
              },
            },
          },
          responses: {
            201: {
              description: "Livre créé avec succès",
            },
          },
        },
      },
      "/api/books/{id}": {
        get: {
          tags: ["Books"],
          summary: "Récupérer un livre par son ID",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: {
                type: "integer",
              },
            },
          ],
          responses: {
            200: {
              description: "Livre trouvé",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Book",
                  },
                },
              },
            },
            404: {
              description: "Livre non trouvé",
            },
          },
        },
      },
      "/api/books/{bookId}/evaluations": {
        get: {
          tags: ["Evaluations"],
          summary: "Récupérer les évaluations d'un livre",
          parameters: [
            {
              name: "bookId",
              in: "path",
              required: true,
              schema: {
                type: "integer",
              },
            },
          ],
          responses: {
            200: {
              description: "Liste des évaluations récupérée avec succès",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      $ref: "#/components/schemas/Evaluation",
                    },
                  },
                },
              },
            },
          },
        },
        post: {
          tags: ["Evaluations"],
          summary: "Ajouter une évaluation à un livre",
          parameters: [
            {
              name: "bookId",
              in: "path",
              required: true,
              schema: {
                type: "integer",
              },
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Evaluation",
                },
              },
            },
          },
          responses: {
            201: {
              description: "Évaluation ajoutée avec succès",
            },
          },
        },
      },
      "/api/categories": {
        get: {
          tags: ["Categories"],
          summary: "Récupérer toutes les catégories",
          responses: {
            200: {
              description: "Liste des catégories récupérée avec succès",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      $ref: "#/components/schemas/Category",
                    },
                  },
                },
              },
            },
          },
        },
      },
      "/api/categories/{id}/books": {
        get: {
          tags: ["Categories"],
          summary: "Récupérer les livres d'une catégorie",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: {
                type: "integer",
              },
            },
          ],
          responses: {
            200: {
              description:
                "Liste des livres de la catégorie récupérée avec succès",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      $ref: "#/components/schemas/Book",
                    },
                  },
                },
              },
            },
          },
        },
      },
      "/api/authors": {
        get: {
          tags: ["Authors"],
          summary: "Récupérer tous les auteurs",
          responses: {
            200: {
              description: "Liste des auteurs récupérée avec succès",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      $ref: "#/components/schemas/Writer",
                    },
                  },
                },
              },
            },
          },
        },
      },
      "/api/authors/{id}": {
        get: {
          tags: ["Authors"],
          summary: "Récupérer un auteur par son ID",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: {
                type: "integer",
              },
            },
          ],
          responses: {
            200: {
              description: "Auteur trouvé",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Writer",
                  },
                },
              },
            },
            404: {
              description: "Auteur non trouvé",
            },
          },
        },
      },
      "/api/authors/{id}/books": {
        get: {
          tags: ["Authors"],
          summary: "Récupérer les livres d'un auteur",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: {
                type: "integer",
              },
            },
          ],
          responses: {
            200: {
              description: "Liste des livres de l'auteur récupérée avec succès",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      $ref: "#/components/schemas/Book",
                    },
                  },
                },
              },
            },
          },
        },
      },
      "/api/books/{bookId}/comments": {
        get: {
          tags: ["Comments"],
          summary: "Récupérer les commentaires d'un livre",
          parameters: [
            {
              name: "bookId",
              in: "path",
              required: true,
              schema: {
                type: "integer",
              },
            },
          ],
          responses: {
            200: {
              description: "Liste des commentaires récupérée avec succès",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      $ref: "#/components/schemas/Comment",
                    },
                  },
                },
              },
            },
          },
        },
        post: {
          tags: ["Comments"],
          summary: "Ajouter un commentaire à un livre",
          parameters: [
            {
              name: "bookId",
              in: "path",
              required: true,
              schema: {
                type: "integer",
              },
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Comment",
                },
              },
            },
          },
          responses: {
            201: {
              description: "Commentaire ajouté avec succès",
            },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*/*.js"], // Path to the API routes
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
