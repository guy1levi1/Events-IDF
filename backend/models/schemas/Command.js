const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../dbConfig");

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

module.exports = Command;