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
        allowNull: true,
        validate: {
          min: {
            args: [1],
            msg: "la note doit être au moins de 1",
          },
          max: {
            args: [10],
            msg: "la note ne peux pas dépasser 5",
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
      foreignKey: "user_id",
      as: "user",
    });
    Evaluate.belongsTo(models.t_livre, {
      foreignKey: "book_id",
      as: "book",
    });
  };

  return Evaluate;
};

export { EvaluateModel };
