const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const HttpError = require("../models/httpError");
const User = require("../models/schemas/User");

// for manage users page
const getUsers = async (req, res, next) => {
  try {
    const Users = await User.findAll({});

    res.json(Users);
  } catch (err) {
    const error = new HttpError("Get all users failed.", 500);

    console.log(err);
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  const userId = req.params.userId;

  try {
    const user = await User.findByPk(userId); // Assuming you have a model with a primary key named 'id'

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

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { privateNumber, fullName, pw, command, isAdmin } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ privateNumber: privateNumber });
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError(
      "User exists already, please login instead.",
      422
    );
    return next(error);
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError(
      "Could not create user, please try again.",
      500
    );
    return next(error);
  }

  const createdUser = new User({
    name,
    email,
    image: req.file.path,
    password: hashedPassword,
    places: [],
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: createdUser.id, email: createdUser.email },
      "supersecret_dont_share",
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }

  res
    .status(201)
    .json({ userId: createdUser.id, email: createdUser.email, token: token });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Logging in failed, please try again later.",
      500
    );
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      403
    );
    return next(error);
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new HttpError(
      "Could not log you in, please check your credentials and try again.",
      500
    );
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      403
    );
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      "supersecret_dont_share",
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new HttpError(
      "Logging in failed, please try again later.",
      500
    );
    return next(error);
  }

  res.json({
    userId: existingUser.id,
    email: existingUser.email,
    token: token,
  });
};

const updateUser = async (userId, updatedFields) => {
  try {
    // Find the user by ID
    const user = await User.findByPk(userId);

    // If user not found, return null or handle accordingly
    if (!user) {
      const error = new HttpError(
        `Could not update user ${userId} , user does'nt exist.`,
        403
      );
      return next(error);
    }

    // Update the user fields
    if (updatedFields.privateNumber) {
      user.privateNumber = updatedFields.privateNumber;
    }

    if (updatedFields.fullName) {
      user.fullName = updatedFields.fullName;
    }

    if (updatedFields.commandId) {
      user.commandId = updatedFields.commandId;
    }

    // Save the updated user
    await user.save();

    // Return the updated user
    next(user);
  } catch (err) {
    // Handle errors
    console.error(error);
    const error = new HttpError(
      `Could not update user ${userId} , please try again later.`,
      500
    );
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("failed to delete user, try later.", 422)
    );
  }

  const { userId } = req.body;

  let users;
  let userById;
  try {
    users = await Event.findAll({});
    userById = await users.findOne({
      where: { id: userById },
    });
  } catch (err) {
    const error = new HttpError("failed to get the user by id", 500);
    next(error);
  }

  if (!userId) {
    const error = new HttpError("there is no user with the id", 500);
    next(error);
  }

  try {
    await userById.destroy();
  } catch (err) {
    const error = new HttpError("could not delete user", 500);
    next(error);
  }

  res.status(201).json({ massage: "DELETE" });
};

exports.getUsers = getUsers;
exports.getUserById = getUserById;
exports.login = login;
exports.signup = signup;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
