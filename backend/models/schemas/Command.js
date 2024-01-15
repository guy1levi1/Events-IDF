const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../dbConfig");
const User = require("./User");
const UnapprovedUser = require("./UnapprovedUser");
const EventCommands = require("./EventCommands");

class Command extends Model {
  static associate() {
    // define association here
    // Command.hasMany(EventCommands, {
    //   foreignKey: "commandId",
    // });
    // Command.hasMany(UnapprovedUser, { foreignKey: "commandId" });
    // Command.hasMany(User, {
    //   foreignKey: "commandId",
    // });
  }
}

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

module.exports = Command;
