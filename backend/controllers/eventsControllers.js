const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const HttpError = require("../models/httpError");
const Event = require("../models/schemas/Event");
const User = require("../models/schemas/User");

// for manage users page
const getEvents = async (req, res, next) => {
  try {
    const Events = await Event.findAll({});

    res.json(Events);
  } catch (err) {
    const error = new HttpError("Get all events failed.", 500);

    console.log(err);
    next(error);
  }
};

const getEventById = async (req, res, next) => {
  const eventId = req.params.eventId;

  try {
    const event = await Event.findByPk(eventId);

    if (!event) {
      const error = new HttpError(`User with ID ${eventId} not found.`, 404);
      return next(error);
    }

    res.json(user);
  } catch (err) {
    const error = new HttpError(`Get user by ID ${eventId} failed.`, 500);

    console.error(err);
    next(error);
  }
};

const deleteEvent = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("failed to delete event, try later.", 422));
  }

  const { eventId } = req.body;

  let events;
  let eventById;
  try {
    events = await Event.findAll({});
    eventById = await events.findOne({ where: { id: eventId } });
  } catch (err) {
    const error = new HttpError("failed to get the event by id", 500);
    next(error);
  }

  if (!eventId) {
    const error = new HttpError("there is no event with the id", 500);
    next(error);
  }

  try {
    await eventById.destroy();
  } catch (err) {
    const error = new HttpError("could not delete event", 500);
    next(error);
  }

  res.status(201).json({ massage: "DELETE" });
};

const updateEvent = async (eventId, updatedFields) => {
  try {
    // Find the user by ID
    const event = await Event.findByPk(eventId);

    // If user not found, return null or handle accordingly
    if (!event) {
      const error = new HttpError(
        `Could not update user ${eventId} , user does'nt exist.`,
        403
      );
      return next(error);
    }

    // Update the user fields
    if (updatedFields.name) {
      user.name = updatedFields.name;
    }

    if (updatedFields.description) {
      user.description = updatedFields.description;
    }

    if (updatedFields.date) {
      user.date = updatedFields.date;
    }
    if (updatedFields.place) {
      user.place = updatedFields.place;
    }

    // Save the updated user
    await event.save();

    // Return the updated user
    next(event);
  } catch (err) {
    // Handle errors
    console.error(error);
    const error = new HttpError(
      `Could not update user ${eventid} , please try again later.`,
      500
    );
    next(error);
  }
};

const createEvent = async (req, res, next) => {
  const { name, description, date, place, creatorId } = req.body;

  try {
    // Check if the creatorId exists in the User model
    const userExists = await User.findByPk(creatorId);
    if (!userExists) {
      return next(new HttpError("Invalid userId. The user does not exist.", 400));
    }

    // Create a new event
    const newEvent = await Event.create({ name, description, date, place, creatorId });

    res.status(201).json(newEvent);
  } catch (err) {
    console.error(err);
    next(new HttpError("Create event failed.", 500));
  }
};


exports.getEvents = getEvents;
exports.getEventById = getEventById;
exports.deleteEvent = deleteEvent;
exports.updateEvent = updateEvent;
exports.createEvent = createEvent;

