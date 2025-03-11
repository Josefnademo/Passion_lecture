const EvaluateModel = (sequelize, DataTypes) => {
  return sequelize.define(
    "t_evaluer",
    {
      commentaire: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      note: {
        type: DataTypes.INTEGER,
        allowNull: true,
        min: {
          args: [1.0],
          msg: "la note doit être au moins de 1",
        },
        max: {
          args: [5.0],
          msg: "la note ne peux pas dépasser 5",
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
    { freezeTableName: true }
  );
};
export { EvaluateModel };
