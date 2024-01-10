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

exports.getEvents = getEvents;