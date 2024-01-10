const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../dbConfig");
const Event = require("./Event");
const Command = require("./Command");

class EventCommands extends Model {}

const initializeEventCommands = async () => {
  const commands = await Command.findAll();

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
            args: [Event.findAll().map((event) => event.id)],
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
            args: [Command.findAll().map((command) => command.id)],
            msg: "Invalid commandId. This integer does not exist in the commands table.",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "eventsCommands",
      timestamps: false,
      createdAt: true,
    }
  );
};

initializeEventCommands();

EventCommands.belongsTo(Event, {
  foreignKey: "eventId",
  as: "event",
  onDelete: "CASCADE",
});

EventCommands.belongsTo(Command, {
  foreignKey: "commandId",
  as: "command",
  onDelete: "CASCADE",
});

Event.hasMany(EventCommands, {
  sourceKey: "id",
  foreignKey: "event_id",
});

module.exports = EventCommands;
