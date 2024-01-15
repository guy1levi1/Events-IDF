const { Model, DataTypes } = require("sequelize");
const db = require("../../dbConfig");
const User = require("./User");
const EventCommands = require("./EventCommands");
const EventRequests = require("./EventRequests");

class Event extends Model {
  static associate() {
    // define association here
    // Event.hasMany(EventCommands, {
    //   foreignKey: "eventId",
    //   as: "eventCommands", // You can use any name you prefer
    //   // onDelete: 'CASCADE',
    // });
    // Event.hasMany(EventRequests, {
    //   foreignKey: "eventId",
    // });
    // Event.belongsTo(User);
  }
}

Event.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {},
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        max: 1000,
      },
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true,
      },
    },
    place: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },

  {
    sequelize: db,
    modelName: "events",
    timestamps: false,
    createdAt: true,
  }
);

module.exports = Event;
