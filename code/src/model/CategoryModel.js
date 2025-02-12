const CategorieModel = (sequelize, DataTypes) => {
  return sequelize.define("Categorie", {
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
  });
};
