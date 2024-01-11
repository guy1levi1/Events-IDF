const { Model, DataTypes } = require("sequelize");
const db = require("../../dbConfig");
const User = require("./User");
const EventCommands = require("./EventCommands");

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
      type: DataTypes.DATE,
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
      },
    //   references: {
    //     model: User,
    //     key: "creatorId"
    // }
    },
  },

  {
    sequelize: db,
    modelName: "events",
    timestamps: false,
    createdAt: true,
  }
);

// Event.belongsTo(User, {
//   foreignKey: "creatorId",
//   as: "creator",
//   onDelete: "CASCADE",
// });

// Event.hasMany(EventCommands, {
//   foreignKey: 'eventId',
//   as: 'eventCommands', // You can use any name you prefer
//   onDelete: 'CASCADE',
// });

// Event.belongsTo(User, { foreignKey: 'creatorId' });
// Event.belongsToMany(Command, { through: 'CommandsEvent' });


// Event.hasMany(EventCommands, { foreignKey: 'eventId' });


module.exports = Event;
