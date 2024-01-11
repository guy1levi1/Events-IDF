const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const HttpError = require("../models/httpError");
const UnapprovedUsers = require("../models/schemas/UnapprovedUser");

// for manage users page
const getUnapprovedUsers = async (req, res, next) => {
  try {
    const unapprovedUsers = await UnapprovedUsers.findAll({});

    res.json(unapprovedUsers);
  } catch (err) {
    const error = new HttpError("Get all unapproved users failed.", 500);

    console.log(err);
    next(error);
  }
};

const deleteUnapprovedUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("failed to delete unapproved user, try later.", 422)
    );
  }

  const { unapprovedUserId } = req.body;

  let unapprovedUsers;
  let unapprovedUserById;
  try {
    unapprovedUsers = await Event.findAll({});
    unapprovedUserById = await unapprovedUsers.findOne({
      where: { id: unapprovedUserId },
    });
  } catch (err) {
    const error = new HttpError("failed to get the unapproved user by id", 500);
    next(error);
  }

  if (!unapprovedUsersId) {
    const error = new HttpError("there is no unapproved user with the id", 500);
    next(error);
  }

  try {
    await unapprovedUserById.destroy();
  } catch (err) {
    const error = new HttpError("could not delete unapproved user", 500);
    next(error);
  }

  res.status(201).json({ massage: "DELETE" });
};

exports.getUnapprovedUsers = getUnapprovedUsers;
exports.deleteUnapprovedUser = deleteUnapprovedUser;
