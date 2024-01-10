 const { Model, DataTypes } = require("sequelize");
const db = require("../../dbConfig");
const Command = require("./Command");

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUID,
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
        // is: [/^[^\sא-ת!@#$%^&*()_+={}\]:;<>,.?/"'\\`|]*$/],
        is: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}/,
      },
    },

    // NEED TO USE REF FROM COMMAND TABLE
    commandId: {
      type: DataTypes.STRING,
      allowNull: false,
      // validate: {
      //   isIn: {
      //     args: [commands.map((command) => command.id)],
      //     msg: "Invalid commandId. This integer does not exist in the commands table.",
      //   },
      // },
    },

    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "users",
    timestamps: false,
    createdAt: true,
  }
);

User.belongsTo(Command, {
  foreignKey: "commandId",
  as: "command",
  onDelete: "CASCADE",
});

module.exports = User;
