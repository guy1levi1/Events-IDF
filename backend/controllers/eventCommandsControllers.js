const { validationResult } = require("express-validator");
const HttpError = require("../models/httpError");
const EventCommands = require("../models/schemas/EventCommands");

// Get all event commands
const getAllEventsCommands = async (req, res, next) => {
  try {
    const eventsCommands = await EventCommands.findAll();
    res.json(eventsCommands);
  } catch (err) {
    console.error(err);
    const error = new HttpError("Get all events commands failed.", 500);
    next(error);
  }
};

// Get event commands by eventId
const getEventCommandsByEventId = async (req, res, next) => {
  const eventId = req.params.eventId;
  try {
    const eventsCommands = await EventCommands.findAll({
      where: { eventId },
    });

    if (!eventsCommands || eventsCommands.length === 0) {
      return next(
        new HttpError(
          `EventCommands for event with id ${eventId} not found.`,
          404
        )
      );
    }

    res.json(eventsCommands);
  } catch (err) {
    console.error(err);
    next(new HttpError("Get event commands by eventId failed.", 500));
  }
};

// Create a new event command
const createEventCommand = async (req, res, next) => {
  const { id, eventId, commandId } = req.body;

  try {
    const newEventCommand = await EventCommands.create({
      id,
      eventId,
      commandId,
    });
    res.status(201).json(newEventCommand);
  } catch (err) {
    console.error(err);
    next(new HttpError("Create event command failed.", 500));
  }
};

// Delete event command by eventId and commandId
const deleteEventCommand = async (req, res, next) => {
  const eventId = req.params.eventId;
  const commandId = req.body.commandId;

  try {
    const eventCommand = await EventCommands.findOne({
      where: { eventId, commandId },
    });

    if (!eventCommand) {
      return next(
        new HttpError(
          `EventCommand with eventId ${eventId} and commandId ${commandId} not found.`,
          404
        )
      );
    }

    await eventCommand.destroy();
    res.status(204).end();
  } catch (err) {
    console.error(err);
    next(new HttpError("Delete event command failed.", 500));
  }
};

// Delete all event commands with a specific eventId
const deleteAllEventCommandsByEventId = async (req, res, next) => {
  const eventId = req.params.eventId;

  try {
    const eventCommands = await EventCommands.destroy({
      where: { eventId },
    });

    if (!eventCommands) {
      return next(
        new HttpError(
          `No EventCommands found for event with id ${eventId}.`,
          404
        )
      );
    }

    res.status(204).end();
  } catch (err) {
    console.error(err);
    next(new HttpError("Delete all event commands by eventId failed.", 500));
  }
};

module.exports = {
  getAllEventsCommands,
  getEventCommandsByEventId,
  createEventCommand,
  deleteEventCommand,
  deleteAllEventCommandsByEventId,
};
