const CategoryModel = (sequelize, DataTypes) => {
  const Category = sequelize.define(
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
    {
      timestamps: true,
      createdAt: "created",
      updatedAt: "updated",
      freezeTableName: true,
    }
  );

  return Category;
};

export { CategoryModel };
