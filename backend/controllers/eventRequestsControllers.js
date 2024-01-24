const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const HttpError = require("../models/httpError");
const EventRequests = require("../models/schemas/EventRequests");

const geteventsRequests = async (req, res, next) => {
  try {
    const eventRequests = await EventRequests.findAll({});

    res.json(eventRequests);
  } catch (err) {
    const error = new HttpError("Get all eventRequests failed.", 500);

    console.log(err);
    next(error);
  }
};

// probably we will not use it, just delete by eventId and create new
const geteventRequestsById = async (req, res, next) => {
  const eventRequestsId = req.params.eventRequestId;

  try {
    const eventRequests = await EventRequests.findByPk(eventRequestsId);

    if (!eventRequests) {
      const error = new HttpError(
        `eventRequests with ID ${eventRequestsId} not found.`,
        404
      );
      return next(error);
    }

    res.json(eventRequests);
  } catch (err) {
    const error = new HttpError(
      `Get eventRequests by ID ${eventRequestsId} failed.`,
      500
    );

    console.error(err);
    next(error);
  }
};

const getEventRequestsByEventId = async (req, res, next) => {
  const eventId = req.params.eventId;

  try {
    const eventRequests = await EventRequests.findAll({
      where: { eventId: eventId },
    });

    if (eventRequests.length === 0) {
      const error = new HttpError(
        `No rows found for event with ID ${eventId}.`,
        404
      );
      return next(error);
    }

    res.json(eventRequests);
  } catch (err) {
    const error = new HttpError(`Get rows by event ID ${eventId} failed.`, 500);

    console.error(err);
    next(error);
  }
};

const createEventRequest = async (req, res, next) => {
  const {
    id,
    eventId,
    serialNumber,
    privateNumber,
    firstName,
    lastName,
    command,
    division,
    unit,
    rank,
    appointmentRank,
    appointmentLetter,
    reasonNonArrival,
    status,
  } = req.body;

  console.log(serialNumber)

  try {
    // Create a new event request
    const newEventRequest = await EventRequests.create({
      id,
      eventId,
      serialNumber,
      privateNumber,
      firstName,
      lastName,
      command,
      division,
      unit,
      rank,
      appointmentRank,
      appointmentLetter,
      reasonNonArrival,
      status,
    });

    res.status(201).json(newEventRequest);
  } catch (err) {
    console.log(err.errors);
    console.error(err);
    const error = new HttpError(
      "Creating event request failed. Please try again.",
      500
    );
    next(error);
  }
};

const deleteEventRequest = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(
        new HttpError("failed to delete EventRequests, try later.", 422)
      );
    }
    const eventRequestId = req.params.eventRequestId;

    let eventRequestById;
    try {
      eventRequestById = await EventRequests.findOne({
        where: { id: eventRequestId },
      });
    } catch (err) {
      const error = new HttpError("failed to get the EventRequests by id", 500);
      next(error);
    }

    if (!eventRequestById) {
      const error = new HttpError("there is no EventRequests with the id", 500);
      next(error);
    }

    try {
      await eventRequestById.destroy();
    } catch (err) {
      throw new HttpError("could not delete eventRequest", 500);
    }

    res.status(201).json({ massage: `DELETE: ${eventRequestId}` });
  } catch (error) {
    next(error); // Send the error to the error-handling middleware
  }
};

// Delete all event commands with a specific eventId
const deleteAllEventRequestsByEventId = async (req, res, next) => {
  const eventId = req.params.eventId;

  try {
    const eventCommands = await EventRequests.destroy({
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

exports.geteventsRequests = geteventsRequests;
exports.getEventRequestsByEventId = getEventRequestsByEventId;
exports.createEventRequest = createEventRequest;
exports.deleteEventRequest = deleteEventRequest;
exports.geteventRequestsById = geteventRequestsById;
exports.deleteAllEventRequestsByEventId = deleteAllEventRequestsByEventId;
