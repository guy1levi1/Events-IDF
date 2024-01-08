const { Model, DataTypes } = require("sequelize");
const sequelize = require("./dbConfig");
const { Command } = require("./models"); // Import the Command model

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    privateNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isNumeric: true,
        len: 7,
      },
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true,
        len: [2, 30],
        is: [/^[א-ת']+(\s[א-ת']{1,}){1,2}$/],
      },
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 6,
        is: [/^[^\sא-ת!@#$%^&*()_+={}\]:;<>,.?/"'\\`|]*$/],
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
