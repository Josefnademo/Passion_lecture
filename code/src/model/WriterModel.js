const WriterModel = (sequelize, DataTypes) => {
  const Writer = sequelize.define(
    "t_ecrivain", // Model name
    {
      ecrivain_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      prenom: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      nom_de_famille: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    { freezeTableName: true }
  );

  Writer.belongsToMany(sequelize.models.t_livre, {
    through: "WriterBooks",
    foreignKey: "ecrivain_id",
  });

  return Writer;
};

export { WriterModel };
