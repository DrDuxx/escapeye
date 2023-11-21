module.exports = (sequelize, DataTypes) => {
  const MonopolyGame = sequelize.define(
    "MonopolyGame",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      startedAt: {
        type: DataTypes.STRING,
      },
      time: {
        type:DataTypes.INTEGER
      },
      players: {
        type: DataTypes.JSONB,
      },
      transactions: {
        type: DataTypes.JSONB,
      },
      colors: {
        type: DataTypes.JSONB,
      },
      chances: {
        type: DataTypes.JSONB,
      },
      dares: {
        type: DataTypes.JSONB,
      },
      trivias: {
        type: DataTypes.JSONB,
      },
      triviaSessions:{
        type: DataTypes.JSONB,
      },
      triviaCategoryMode:{
          type: DataTypes.BOOLEAN,
      },
      bostaMode:{
          type: DataTypes.BOOLEAN,
      },
      winner:{
        type: DataTypes.INTEGER,
      },
      isRunning: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      freezeTableName: true,
      tableName: "monopoly_game",
      timestamps: true,
      paranoid: true,
    }
  );

  MonopolyGame.associate = function (models) {};

  return MonopolyGame;
};
