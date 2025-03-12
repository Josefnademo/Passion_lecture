const UserModel = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "t_user",
    {
      utilisateur_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      hashed_password: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { msg: "erreur, hash déjà existant." },
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { msg: "Ce username est déjà pris." },
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        default: false,
      },
    },
    {
      timestamps: true,
      createdAt: "date_creation",
      updatedAt: false,
      freezeTableName: true,
    }
  );

  return User;
};

export { UserModel };
