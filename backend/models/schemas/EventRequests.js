const { Model, DataTypes } = require("sequelize");
const sequelize = require("./dbConfig");
const { Command } = require("./models"); // Import the Command model

class User extends Model {}

const statusOptions = ["מאושר", 'ממתין לאישור רמ"ח', "נדחה"];

User.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    // NEED TO USE REF FROM events TABLE
    eventId: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true,
        len: [2, 30],
        is: [/^[א-ת']+(\s[א-ת']{1,}){1,2}$/],
      },
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
      validate: {
        min: 2,
        isAlpha: true,
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 2,
        isAlpha: true,
      },
    },

    command: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 2 },
    },
    division: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 2 },
    },
    unit: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { min: 2 },
    },
    rank: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { min: 2 },
    },
    appointmentRank: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { min: 2 },
    },
    appointmentLetter: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { min: 2 },
    },
    reasonNonArrival: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { min: 2 },
    },
    status: {
      type: DataTypes.ENUM(...statusOptions),
      allowNull: false,
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

    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "users",
    timestamps: false,
    createdAt: true,
  }
);

module.exports = User;
