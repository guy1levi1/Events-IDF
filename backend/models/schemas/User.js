const { Model, DataTypes } = require("sequelize");
const db = require("../../dbConfig");
const Command = require("./Command");
const Event = require("./Event");

class User extends Model {
  static associate() {
    // define association here
    User.hasMany(Event, { foreignKey: "creatorId" });
  }
}

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
    fullName: {
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
      type: DataTypes.UUID,
      allowNull: false,
      // references: {
      //   model: "commands",
      //   key: "id",
      // },
      // onDelete: "CASCADE",
      // onUpdate: "CASCADE",
      // references: {
      //   model: Command,
      //   key: "commandId",
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

// User.belongsTo(Command, {
//   foreignKey: "commandId",
//   as: "command",
//   onDelete: "CASCADE",
// });

// User.hasMany(Event, { foreignKey: "creatorId" });

module.exports = User;
