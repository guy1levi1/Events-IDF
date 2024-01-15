const { Model, DataTypes } = require("sequelize");
const db = require("../../dbConfig");
const Command = require("./Command");
const Event = require("./Event");

class User extends Model {
  static associate() {
    // define association here
    // User.hasMany(Event, { foreignKey: "creatorId" });
    // User.hasMany(Event, {
    //   foreignKey: { type: DataTypes.UUID, allowNull: false },
    // });
    // User.belongsTo(Command, {
    //   foreignKey: "commandId",
    // });
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
        len: [2, 30],
        is: [/^[א-ת']+(\s[א-ת']{1,}){1,2}$/],
      },
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
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

module.exports = User;
