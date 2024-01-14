const { Model, DataTypes } = require("sequelize");
const db = require("../../dbConfig");
const Command = require("./Command");

class UnapprovedUser extends Model {}

UnapprovedUser.init(
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
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 30],
        is: [/^[א-ת']+(\s[א-ת']{1,}){1,2}$/],
      },
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    // NEED TO USE REF FROM COMMAND TABLE
    commandId: {
      type: DataTypes.UUID,
      allowNull: false,
      // validate: {
      //   isIn: {
      //     args: [commands.map((command) => command.id)],
      //     msg: "Invalid commandId. This integer does not exist in the commands table.",
      //   },
      // },
      //   references: {
      //     model: Command,
      //     key: "commandId"
      // }
    },

    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "unapprovedUsers",
    timestamps: false,
    createdAt: true,
  }
);

// UnapprovedUsers.belongsTo(Command, {
//   foreignKey: "commandId",
//   as: "command",
//   onDelete: "CASCADE",
// });

// UnapprovedUser.belongsTo(Command, { foreignKey: 'commandId' });

module.exports = UnapprovedUser;
