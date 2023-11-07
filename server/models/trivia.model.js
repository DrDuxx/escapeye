module.exports = (sequelize, DataTypes) => {
  const Trivia = sequelize.define(
    "Trivia",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING,
      },
      question: {
        type: DataTypes.TEXT,
      },
      answer: {
        type: DataTypes.TEXT,
      },
    },
    {
      freezeTableName: true,
      tableName: "trivia",
      timestamps: true,
      paranoid: true,
    }
  );

  Trivia.associate = function (models) {};

  return Trivia;
};
