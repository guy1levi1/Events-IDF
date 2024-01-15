const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sha256 = require("js-sha256");

const HttpError = require("../models/httpError");
const UnapprovedUser = require("../models/schemas/UnapprovedUser");
const User = require("../models/schemas/User");

// for manage users page
const getUnapprovedUsers = async (req, res, next) => {
  try {
    const unapprovedUsers = await UnapprovedUser.findAll({});

    res.json(unapprovedUsers);
  } catch (err) {
    const error = new HttpError("Get all unapproved users failed.", 500);

    console.log(err);
    next(error);
  }
};

const getUnapprovedUserById = async (req, res, next) => {
  const userId = req.params.unApprovedUserId;

  try {
    const user = await UnapprovedUser.findByPk(userId); // Assuming you have a model with a primary key named 'id'

    if (!user) {
      const error = new HttpError(`User with ID ${userId} not found.`, 404);
      return next(error);
    }

    res.json(user);
  } catch (err) {
    const error = new HttpError(`Get user by ID ${userId} failed.`, 500);

    console.error(err);
    next(error);
  }
};

const createUnapprovedUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { id, privateNumber, fullName, password, commandId, isAdmin } =
    req.body;
  console.log(req.body);

  let existingUnapprovedUser;
  try {
    existingUnapprovedUser = await UnapprovedUser.findOne({
      where: { privateNumber },
    });
    console.log("existingUnapprovedUser: " + existingUnapprovedUser);
  } catch (err) {
    console.log("ERROR");
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }

  try {
    existingUser = await User.findOne({
      where: { privateNumber },
    });
    console.log("existingUser: ");

    console.log(existingUser);
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }

  if (existingUser || existingUnapprovedUser) {
    const error = new HttpError(
      "User exists already, please login instead.",
      422
    );
    return next(error);
  }

  let hashedPassword;
  try {
    hashedPassword = sha256(password);
  } catch (err) {
    const error = new HttpError(
      "Could not create user, please try again.",
      500
    );
    return next(error);
  }

  try {
    const newUser = await UnapprovedUser.create({
      id,
      privateNumber,
      fullName,
      password: hashedPassword,
      commandId,
      isAdmin,
    });

    res.status(201).json(newUser);
  } catch (err) {
    console.log(err);
    console.log("Validation errors:", err.errors);
    console.log("failed");
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }
};

const deleteUnapprovedUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new HttpError("failed to delete user, try later.", 422);
    }

    const userId = req.params.unapprovedUserId;
    console.log(userId);

    let userById;
    try {
      userById = await UnapprovedUser.findOne({
        where: { id: userId },
      });
      console.log(userById);
    } catch (err) {
      throw new HttpError("failed to get the user by id", 500);
    }

    if (!userById) {
      throw new HttpError("there is no user with the id", 404); // Assuming 404 is more appropriate for not found
    }

    try {
      await userById.destroy();
    } catch (err) {
      throw new HttpError("could not delete user", 500);
    }

    res.status(201).json({ message: `DELETE + ${userId}` });
  } catch (error) {
    next(error); // Send the error to the error-handling middleware
  }
};

exports.getUnapprovedUsers = getUnapprovedUsers;
exports.getUnapprovedUserById = getUnapprovedUserById;
exports.createUnapprovedUser = createUnapprovedUser;
exports.deleteUnapprovedUser = deleteUnapprovedUser;
