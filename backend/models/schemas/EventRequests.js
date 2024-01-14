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
      type: DataTypes.UUID,
      allowNull: false,
      // validate: {
      //   isIn: {
      //     args: [Event.fiדndAll().map((event) => event.id)],
      //     msg: "Invalid eventId. This UUID does not exist in the commands table.",
      //   },
      // },
      //   references: {
      //     model: Event,
      //     key: "eventId"
      // }
    },
    serialNumber: {
      type: DataTypes.STRING,
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
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    commandId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    division: {
      type: DataTypes.STRING,
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

// EventRequests.belongsTo(Event, {
//   foreignKey: "eventId",
//   as: "event",
//   onDelete: "CASCADE",
// });
// EventRequests.belongsTo(Event, { foreignKey: 'eventId' });

module.exports = EventRequests;
