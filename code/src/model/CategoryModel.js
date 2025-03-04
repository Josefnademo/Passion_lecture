const CategorieModel = (sequelize, DataTypes) => {
  return sequelize.define(
    "t_category",
    {
      categorie_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nom: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Ce nom de categorie est déjà pris.",
        },
      },
    },
    { freezeTableName: true }
  );
};
