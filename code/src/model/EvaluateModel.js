import { Sequelize, DataTypes } from "sequelize";

const EvaluateModel = (sequelize) => {
  const Evaluate = sequelize.define(
    "t_evaluer",
    {
      commentaire: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      note: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          min: {
            args: [1],
            msg: "La note doit être au moins de 1.",
          },
          max: {
            args: [5],
            msg: "La note ne peut pas dépasser 5.",
          },
        },
      },
      livre_fk: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "t_livre",
          key: "livre_id",
        },
      },
      utilisateur_fk: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "t_utilisateur",
          key: "utilisateur_id",
        },
      },
    },
    { freezeTableName: true }
  );

  return Evaluate;
};

export { EvaluateModel };
