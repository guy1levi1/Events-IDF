const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../dbConfig");
const User = require("./User");
const UnapprovedUser = require("./UnapprovedUser");

class Command extends Model {}

Command.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    commandName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {},
    },
  },
  {
    sequelize,
    modelName: "commands",
    timestamps: false,
    createdAt: true,
  }
);

// Command.belongsToMany(Event, { through: 'CommandsEvent' });

// Command.hasMany(UnapprovedUser, { foreignKey: "commandId" });
 
module.exports = Command;
