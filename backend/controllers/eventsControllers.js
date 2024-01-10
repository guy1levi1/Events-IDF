const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const HttpError = require("../models/httpError");
const Event = require("../models/schemas/Event");

// for manage users page
const getEvents = async (req, res, next) => {
  try {
    const Events = await Event.findAll({});

    res.json(Events);
    
  } catch (err) {
    const error = new HttpError("Get all users failed.", 500);

    console.log(err);
    next(error);
  }
};

const deleteEvent = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("failed to delete event, try later.", 422)
    );
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

  if(!eventId) {
    const error = new HttpError("there is no event with the id", 500);
    next(error);
  }

  try {
    await eventById.destroy();
  } catch (err) {
    const error = new HttpError("could not delete event", 500);
    next(error);
  }

  res.status(201).json({ massage: "DELETE"});

}

exports.getEvents = getEvents;
exports.deleteEvent = deleteEvent;