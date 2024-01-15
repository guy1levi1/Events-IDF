const { DataTypes } = require("sequelize");
const User = require("./schemas/User");
const Event = require("./schemas/Event");
const Command = require("./schemas/Command");
const EventCommands = require("./schemas/EventCommands");
const EventRequests = require("./schemas/EventRequests");
const UnapprovedUser = require("./schemas/UnapprovedUser");

//one to many relation (user as many events)
User.hasMany(Event, {
  foreignKey: { type: DataTypes.UUID, allowNull: false },
});
Event.belongsTo(User);

//one to many relation (command as many users)
Command.hasMany(User, {
  foreignKey: {
    type: DataTypes.UUID,
    allowNull: false,
  },
});
User.belongsTo(Command);

//one to many relation (command as many eventCommands)
Command.hasMany(EventCommands, {
  foreignKey: {
    type: DataTypes.UUID,
    allowNull: false,
  },
});
EventCommands.belongsTo(Command);

//one to many relation (event as many eventCommands {eventId})
Event.hasMany(EventCommands, {
  foreignKey: {
    type: DataTypes.UUID,
    allowNull: false,
  },
});
EventCommands.belongsTo(Event);

//one to many relation (event as many eventsRequest)
Event.hasMany(EventRequests, {
  foreignKey: {
    type: DataTypes.UUID,
    allowNull: false,
  },
});
EventRequests.belongsTo(Event);

//one to many relation (command as many UnapprovedUsers)
Command.hasMany(UnapprovedUser, {
  foreignKey: {
    type: DataTypes.UUID,
    allowNull: false,
  },
});
UnapprovedUser.belongsTo(Command);
