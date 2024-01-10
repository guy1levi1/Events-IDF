const { Model, DataTypes } = require("sequelize");
const db = require("../../dbConfig");
const User = require("./User");

class Event extends Model {}

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
      unique: true,
      validate: {
        max: 1000,
      },
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isDate: true,
      },
    },
    place: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    creatorId: {
      type: DataTypes.UUID,
      allowNull: false,
      validate: {
        // isIn: {
        //   args: [User.findAll().map((user) => user.id)],
        //   msg: "Invalid userId. This integer does not exist in the commands table.",
        // },
      }
    },
  },

  {
    sequelize: db,
    modelName: "events",
    timestamps: false,
    createdAt: true,
  }
);

Event.belongsTo(User, {
  foreignKey: "creatorId",
  as: "creator",
  onDelete: "CASCADE",
});

module.exports = Event;
