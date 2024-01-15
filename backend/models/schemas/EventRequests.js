const { Model, DataTypes } = require("sequelize");
const db = require("../../dbConfig");
const Event = require("./Event");

class EventRequests extends Model {
  static associate(models) {
    // define association here
    // EventRequests.belongsTo(Event, { foreignKey: "eventId" });
  }
}

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

module.exports = EventRequests;
