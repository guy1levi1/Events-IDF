const { Model, DataTypes } = require("sequelize");
const db = require("../../dbConfig");

class EventCommands extends Model {}

EventCommands.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
  },
  {
    sequelize: db,
    modelName: "eventsCommands",
    timestamps: false,
    createdAt: true,
  }
);

module.exports = EventCommands;
