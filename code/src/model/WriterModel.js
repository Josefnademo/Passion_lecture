const WriterModel = (sequelize, DataTypes) => {
  return sequelize.define(
    "t_ecrivain",
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
};
export { WriterModel };
