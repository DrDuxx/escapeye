module.exports = (sequelize, DataTypes) => {
  const Match = sequelize.define(
    "Match",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      score:{
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      numberOfPlayers: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      startedAt: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      finishedAt: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      hintsUsed: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: [],
      },
      solutionsUsed: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: [],
      },
      roomId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      teamName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      escaped: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
    },
    {
      freezeTableName: true,
      tableName: "match",
      timestamps: true,
      paranoid: true,
    }
  );

  Match.associate = function (models) {};

  return Match;
};
