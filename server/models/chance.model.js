module.exports = (sequelize, DataTypes) => {
    const Chance = sequelize.define(
      "Chance",
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
          allowNull: false,
        },
        title:{
          type: DataTypes.STRING,
        },
        actionType:{
          type: DataTypes.STRING // money, color, other
        },
        amount:{
          type: DataTypes.INTEGER
        },
        direction:{
          type: DataTypes.STRING // pb, bp, pp
        },
        action: {
          type: DataTypes.TEXT,
        },
      },
      {
        freezeTableName: true,
        tableName: "chance",
        timestamps: true,
        paranoid: true,
      }
    );
  
    Chance.associate = function (models) {};
  
    return Chance;
  };
  