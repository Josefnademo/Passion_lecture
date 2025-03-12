const CategoryModel = (sequelize, DataTypes) => {
  return sequelize.define(
    "t_categorie",
    {
      categorie_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
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
export { CategoryModel };
