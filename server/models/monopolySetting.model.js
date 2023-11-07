module.exports = (sequelize, DataTypes) => {
    const MonopolySetting = sequelize.define(
      "MonopolySetting",
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
          allowNull: false,
        },
        option_name: {
          type: DataTypes.STRING,
        },
        option_value:{
            type: DataTypes.JSONB,
        },
      },
      {
        freezeTableName: true,
        tableName: "monopoly_setting",
        timestamps: true,
        paranoid: true,
      }
    );
  
    MonopolySetting.associate = function (models) {};
  
    return MonopolySetting;
  };
  