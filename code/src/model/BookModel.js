// https://sequelize.org/docs/v7/models/data-types/
const LivreModel = (sequelize, DataTypes) => {
  return sequelize.define(
    "Livre",
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
          is: {
            args: /^[A-Za-z\s&]*$/,
            msg: "Seules les lettres et les espaces sont autorisées.",
          },
          notEmpty: {
            msg: "Le titre ne peut pas être vide.",
          },
          notNull: {
            msg: "Le nom est une propriété obligatoire.",
          },
        },
      },
      annee_edition: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          isFloat: {
            msg: "Utilisez uniquement des nombres pour la date.",
          },
          notEmpty: {
            msg: "Le prix ne peut pas être vide.",
          },
          notNull: {
            msg: "Le prix est une propriété obligatoire.",
          },
          max: {
            args: [2025.0],
            msg: "L'année doit être antérieure à 2025",
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
        type: DataTypes.STRING,
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
          isInteger: {
            msg: "utilisez uniquement des chiffres pour le nombre de pages.",
          },
          notEmpty: {
            msg: "un livre doit avoir un nombre de pages.",
          },
          notNull: {
            msg: "Le nombre de pages est une propriété obligatoire.",
          },
        },
      },
    },
    {
      timestamps: true,
      createdAt: "created",
      updatedAt: true,
    }
  );
};
export { LivreModel };
