import { DataTypes } from "sequelize";
import { EvaluateModel } from "../model/EvaluateModel.js";

const BookModel = (sequelize) => {
  const Book = sequelize.define(
    "t_livre", // Model name
    {
      livre_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      titre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Ce titre est déjà pris.",
        },
        validate: {
          notEmpty: {
            msg: "Le titre ne peut pas être vide.",
          },
          notNull: {
            msg: "Le titre est une propriété obligatoire.",
          },
        },
      },
      annee_edition: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          isInt: {
            msg: "L'année d'édition doit être un nombre entier.",
          },
          max: {
            args: [2025],
            msg: "L'année doit être inférieure ou égale à 2025.",
          },
        },
      },
      lien_image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      lien_pdf: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      resume: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      editeur: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      nombre_de_page: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: "Le nombre de pages doit être un entier.",
          },
          min: {
            args: [1],
            msg: "Un livre doit avoir au moins une page.",
          },
        },
      },
      utilisateur_fk: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "t_utilisateur",
          key: "utilisateur_id",
        },
      },
      ecrivain_fk: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "t_ecrivain",
          key: "ecrivain_id",
        },
      },
      categorie_fk: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "t_categorie",
          key: "categorie_id",
        },
      },
    },
    {
      timestamps: true,
      createdAt: "created",
      updatedAt: "updated",
      freezeTableName: true,
    }
  );

  const Evaluate = EvaluateModel(sequelize); // Get the Evaluate model
  Book.hasMany(Evaluate, { foreignKey: "livre_fk" });

  return Book;
};

export { BookModel };
