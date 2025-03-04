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
    },
    { freezeTableName: true }
  );
};
export { EvaluateModel };
