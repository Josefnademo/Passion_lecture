const EvaluateModel = (sequelize, DataTypes) => {
  const Evaluate = sequelize.define(
    "t_evaluer",
    {
      commentaire: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      note: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: {
            args: [0],
            msg: "la note doit être au moins de 0",
          },
          max: {
            args: [10],
            msg: "la note ne peux pas dépasser 10",
          },
        },
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "t_user",
          key: "utilisateur_id",
        },
      },
      book_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "t_livre",
          key: "livre_id",
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

  Evaluate.associate = (models) => {
    Evaluate.belongsTo(models.t_user, {
      foreignKey: "utilisateur_id",
      as: "user",
      onDelete: "CASCADE",
    });
    Evaluate.belongsTo(models.t_livre, {
      foreignKey: "livre_id",
      as: "book",
      onDelete: "CASCADE",
    });
  };

  return Evaluate;
};

export { EvaluateModel };
