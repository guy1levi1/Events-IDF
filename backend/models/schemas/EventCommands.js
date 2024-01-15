const { Model, DataTypes } = require("sequelize");
const db = require("../../dbConfig");
const Event = require("./Event");
const Command = require("./Command");

class EventCommands extends Model {
  static associate() {
    // define association here
    // EventCommands.belongsTo(Event, {
    //   foreignKey: "eventId",
    //   as: "event",
    // });
    // EventCommands.belongsTo(Command, {
    //   foreignKey: "commandId",
    // });
  }
}

// const commands = await Command.findAll();
// const events = await Event.findAll();

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
