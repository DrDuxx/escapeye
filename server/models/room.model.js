module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define(
    "Room",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      name:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      description:{
        type: DataTypes.TEXT,
        allowNull: false,
      },
      number: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique:true,
      },
      time: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      freeHintsNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      freeSolutionPenalty: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      hintPenalty: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      solutionPenalty: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      tableName: "room",
      timestamps: true,
      paranoid: true,
    }
  );

  Room.associate = function (models) {};

  return Room;
};
