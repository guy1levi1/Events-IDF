const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const HttpError = require("../models/httpError");
const User = require("../models/schemas/User");
const EventRequests = require("../models/schemas/EventRequests");

// probably we will not use it, just delete by eventId and create new
const updateEventRequests = async (eventRequestsId, updatedFields) => {
  try {
    // Find the user by ID
    const eventRequests = await EventRequests.findByPk(eventRequestsId);

    // If user not found, return null or handle accordingly
    if (!eventRequests) {
      const error = new HttpError(
        `Could not update table ${eventRequestsId} , user does'nt exist.`,
        403
      );
      return next(error);
    }

    // Update the user fields
    if (updatedFields.privateNumber) {
      eventRequests.privateNumber = updatedFields.privateNumber;
    }

    if (updatedFields.fullName) {
      eventRequests.fullName = updatedFields.fullName;
    }

    if (updatedFields.commandId) {
      eventRequests.commandId = updatedFields.commandId;
    }

    // Save the updated user
    await eventRequests.save();

    // Return the updated user
    next(eventRequests);
  } catch (err) {
    // Handle errors
    console.error(error);
    const error = new HttpError(
      `Could not update table ${eventRequestsId} , please try again later.`,
      500
    );
    next(error);
  }
};

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
  const eventRequestsId = req.params.eventRequestsId;

  try {
    const eventRequests = await Event.findByPk(eventRequestsId);

    if (!eventRequests) {
      const error = new HttpError(
        `User with ID ${eventRequestsId} not found.`,
        404
      );
      return next(error);
    }

    res.json(user);
  } catch (err) {
    const error = new HttpError(
      `Get user by ID ${eventRequestsId} failed.`,
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

const createEventRequests = async (req, res, next) => {
  // Validate request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new HttpError("Invalid input. Please check your data.", 422);
    return next(error);
  }

  try {
    const {
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

    // Create a new event request
    const newEventRequest = await EventRequests.create({
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
    console.error(err);
    const error = new HttpError(
      "Creating event request failed. Please try again.",
      500
    );
    next(error);
  }
};

const deleteEventRequests = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("failed to delete EventRequests, try later.", 422)
    );
  }

  const { eventRequestsIdId } = req.body;

  let eventsRequests;
  let eventRequestsById;
  try {
    eventsRequests = await Event.findAll({});
    eventRequestsById = await eventsRequests.findOne({
      where: { id: eventsRequests },
    });
  } catch (err) {
    const error = new HttpError("failed to get the EventRequests by id", 500);
    next(error);
  }

  if (!eventsRequests) {
    const error = new HttpError("there is no EventRequests with the id", 500);
    next(error);
  }

  try {
    await eventRequestsById.destroy();
  } catch (err) {
    const error = new HttpError("could not delete EventRequests", 500);
    next(error);
  }

  res.status(201).json({ massage: "DELETE" });
};

exports.geteventsRequests = geteventsRequests;
exports.getEventRequestsByEventId = getEventRequestsByEventId;
exports.createEventRequests = createEventRequests;
exports.deleteEventRequests = deleteEventRequests;

exports.updateEventRequests = updateEventRequests;
exports.geteventRequestsById = geteventRequestsById;
