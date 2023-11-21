module.exports = (sequelize, DataTypes) => {
    const Dare = sequelize.define(
      "Dare",
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
          allowNull: false,
        },
        action: {
          type: DataTypes.TEXT,
        },
      },
      {
        freezeTableName: true,
        tableName: "dare",
        timestamps: true,
        paranoid: true,
      }
    );
  
    Dare.associate = function (models) {};
  
    return Dare;
  };
  