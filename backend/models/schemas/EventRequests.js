const { Model, DataTypes } = require("sequelize");
const db = require("../../dbConfig");
const Event = require("./Event");

class EventRequests extends Model {}

const statusOptions = ["מאושר", 'ממתין לאישור רמ"ח', "נדחה"];
  
EventRequests.init(
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
      unique: true,
      allowNull: false,
      validate: {
        isIn: {
          args: [Event.findAll().map((event) => event.id)],
          msg: "Invalid eventId. This integer does not exist in the commands table.",
        },
      },
    },
    serialNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true,
      },
    },
    privateNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isNumeric: true,
        len: 7,
      },
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true,
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true,
      },
    },
    command: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    division: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    unit: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rank: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    appointmentRank: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    appointmentLetter: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    reasonNonArrival: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(...statusOptions),
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "eventsRequests",
    timestamps: false,
    createdAt: true,
  }
);

EventRequests.belongsTo(Event, {
  foreignKey: "eventId",
  as: "event",
  onDelete: "CASCADE",
});

module.exports = EventRequests;