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
    console.log("Validation errors:");

    console.log("Validation errors:", err.errors);
    const error = new HttpError("Get all events failed.", 500);

    console.log(err);
    next(error);
  }
};

const getEventById = async (req, res, next) => {
  const eventId = req.params.eventId;

  try {
    const event = await Event.findByPk(eventId);
    console.log(event);

    if (!event) {
      const error = new HttpError(`Event with ID ${eventId} not found.`, 404);
      return next(error);
    }

    res.json(event);
  } catch (err) {
    const error = new HttpError(`Get event by ID ${eventId} failed.`, 500);

    console.error(err);
    next(error);
  }
};

const deleteEvent = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new HttpError("failed to delete event, try later.", 422));
    }

    const eventId = req.params.eventId;

    let eventById;
    try {
      eventById = await Event.findOne({
        where: { id: eventId },
      });
    } catch (err) {
      const error = new HttpError("failed to get the event by id", 500);
      next(error);
    }

    if (!eventById) {
      const error = new HttpError("there is no event with the id", 402);
      next(error);
    }

    try {
      await eventById.destroy();
    } catch (err) {
      throw new HttpError("could not delete event", 500);
    }

    res.status(201).json({ massage: `DELETE:  ${eventId}` });
  } catch (error) {
    next(error); // Send the error to the error-handling middleware
  }
};

const updateEvent = async (req, res, next) => {
  const eventId = req.params.eventId;
  console.log(eventId);

  const { name, description, date, place } = req.body;
  console.log(req.body);

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
    if (name !== undefined) {
      event.name = name;
    }

    if (description !== undefined) {
      event.description = description;
    }

    if (date !== undefined) {
      event.date = date;
    }
    if (place !== undefined) {
      event.place = place;
    }

    // Save the updated user
    await event.save();

    // Return the updated user
    res
      .status(200)
      .json({ message: `Event ${eventId} updated successfully.`, event });
  } catch (err) {
    // Handle errors
    console.error(error);
    const error = new HttpError(
      `Could not update user ${eventId} , please try again later.`,
      500
    );
    next(error);
  }
};

const createEvent = async (req, res, next) => {
  const { id, name, description, date, place, userId } = req.body;
  console.log(userId);
  try {
    // Check if the creatorId exists in the User model
    const userExists = await User.findByPk(userId);
    if (!userExists) {
      return next(
        new HttpError("Invalid userId. The user does not exist.", 404)
      );
    }

    // Create a new event
    const newEvent = await Event.create({
      id,
      name,
      description,
      date,
      place,
      userId,
    });

    res.status(201).json(newEvent);
  } catch (err) {
    console.error(err);
    const error = new HttpError("server couldnt create event.", 500);
    return next(error);
  }
};

exports.getEvents = getEvents;
exports.getEventById = getEventById;
exports.deleteEvent = deleteEvent;
exports.updateEvent = updateEvent;
exports.createEvent = createEvent;
