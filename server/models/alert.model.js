module.exports = (sequelize, DataTypes) => {
    const Alert = sequelize.define(
      "Alert",
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
          allowNull: false,
        },
        roomNumber: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        message: {
          type: DataTypes.TEXT,
        },
      },
      {
        freezeTableName: true,
        tableName: "alert",
        timestamps: true,
        paranoid: true,
      }
    );
  
    Alert.associate = function (models) {};
  
    return Alert;
  };
  