module.exports = (sequelize, DataTypes) => {
  const Lock = sequelize.define(
    "Lock",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      number: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      hint: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      solution: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      roomId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      tableName: "lock",
      timestamps: true,
      paranoid: true,
    }
  );

  Lock.associate = function (models) {};

  return Lock;
};
