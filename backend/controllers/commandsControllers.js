const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const HttpError = require("../models/httpError");
const Command = require("../models/schemas/Command");

// Get all commands
const getAllCommands = async (req, res, next) => {
  try {
    const commands = await Command.findAll();
    res.json(commands);
  } catch (err) {
    console.error(err);
    const error = new HttpError("Get all commands failed.", 500);
    next(error);
  }
};

// Get a specific command by id
const getCommandById = async (req, res, next) => {
  const id = req.params.commandId;
  try {
    const command = await Command.findByPk(id);
    if (!command) {
      return next(new HttpError(`Command with id ${id} not found.`, 404));
    }
    res.json(command);
  } catch (err) {
    console.error(err);
    next(new HttpError("Get command by id failed.", 500));
  }
};

// Post new command
const createCommand = async (req, res, next) => {
  const { id, commandName } = req.body;
  try {
    const newCommand = await Command.create({ id, commandName });
    res.status(201).json(newCommand);
  } catch (err) {
    console.error(err);
    next(new HttpError("Create command failed.", 500));
  }
};

// Patch a command by id
const updateCommandById = async (req, res, next) => {
  console.log("id: " + req.params.commandId);
  console.log("commandName: " + req.body.commandName);

  const id = req.params.commandId;
  const commandName = req.body.commandName;
  try {
    const command = await Command.findByPk(id);
    if (!command) {
      return next(new HttpError(`Command with id ${id} not found.`, 404));
    }

    command.commandName = commandName;
    await command.save();

    res.json(command);
  } catch (err) {
    console.error(err);
    next(new HttpError("Update command failed.", 500));
  }
};

// Delete command by id
const deleteCommandById = async (req, res, next) => {
    const id = req.params.commandId;
    try {
    const command = await Command.findByPk(id);
    if (!command) {
      return next(new HttpError(`Command with id ${id} not found.`, 404));
    }

    await command.destroy();
    res.status(204).end();
  } catch (err) {
    console.error(err);
    next(new HttpError("Delete command failed.", 500));
  }
};

module.exports = {
  getAllCommands,
  getCommandById,
  createCommand,
  updateCommandById,
  deleteCommandById,
};
