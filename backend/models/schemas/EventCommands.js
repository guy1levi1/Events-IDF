const { Model, DataTypes } = require('sequelize');
const db = require("../../dbConfig");
const Event = require("./Event");
const Command = require("./Command");

class EventCommands extends Model {}

const initializeEventCommands = async () => {
  const commands = await Command.findAll();
  const events = await Event.findAll();

  EventCommands.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        unique: true,
      },

      eventId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isIn: {
            args: [events.map((event) => event.id)],
            msg: "Invalid eventId. This integer does not exist in the commands table.",
          },
        },
      },

      // NEED TO USE REF FROM COMMAND TABLE
      commandId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isIn: {
            args: [commands.map((command) => command.id)],
            msg: "Invalid commandId. This integer does not exist in the commands table.",
          },
        },
      },
    },
    {
      sequelize: db,
      modelName: "eventsCommands",
      timestamps: false,
      createdAt: true,
    }
  );
};

initializeEventCommands();

EventCommands.belongsTo(Event, {
  foreignKey: "id", //it was: foreignKey: "eventId",
  as: "event",
  onDelete: "CASCADE",
});

EventCommands.belongsTo(Command, {
  foreignKey: "id", // it was: foreignKey: "commandId",
  as: "command",
  onDelete: "CASCADE",
});

Event.hasMany(EventCommands, {
  sourceKey: "id",
  foreignKey: "id", // it was: "event_id"
});

module.exports = EventCommands;
