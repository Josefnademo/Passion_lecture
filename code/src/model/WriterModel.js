const WriterModel = (sequelize, DataTypes) => {
  const Writer = sequelize.define(
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
    {
      timestamps: true,
      createdAt: "created",
      updatedAt: "updated",
      freezeTableName: true,
    }
  );

  Writer.associate = (models) => {
    Writer.hasMany(models.t_livre, {
      foreignKey: "writer_id",
      as: "books",
    });
  };

  return Writer;
};

export { WriterModel };
