const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const sha256 = require("js-sha256");

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

  const { id, privateNumber, fullName, password, commandId, isAdmin } =
    req.body;
  console.log(req.body);

  let existingUser;
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

  if (existingUser) {
    const error = new HttpError(
      "User exists already, please login instead.",
      422
    );
    return next(error);
  }

  // when admin accept the user it will be hashed so delete this code
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
    // console.log(
    //   id,
    //   privateNumber,
    //   fullName,
    //   hashedPassword,
    //   commandId,
    //   isAdmin
    // );
    const newUser = await User.create({
      id,
      privateNumber,
      fullName,
      password: hashedPassword,
      commandId,
      isAdmin,
    });

    res.status(201).json(newUser);
  } catch (err) {
    console.log("Validation errors:", err.errors);
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }

  // let token;
  // try {
  //   token = jwt.sign(
  //     { userId: id, privateNumber: privateNumber },
  //     "supersecret_dont_share",
  //     { expiresIn: "1h" }
  //   );
  // } catch (err) {
  //   const error = new HttpError(
  //     "Signing In failed, please try again later.",
  //     500
  //   );
  //   return next(error);
  // }

  // res.status(201).json({
  //   userId: id,
  //   privateNumber: privateNumber,
  //   token: token,
  // });
};

const login = async (req, res, next) => {
  const { privateNumber, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({
      where: { privateNumber: privateNumber },
    });
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
      404
    );
    return next(error);
  }

  let isValidPassword = false;
  try {
    const hashedPassowrd = await sha256(password);

    isValidPassword = hashedPassowrd === existingUser.password;
  } catch (err) {
    const error = new HttpError(
      "Could not log you in, please check your credentials and try again.",
      500
    );
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError(
      "Invalid credentials1, could not log you in.",
      401
    );
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.id, privateNumber: existingUser.privateNumber },
      "supersecret_dont_share",
      { expiresIn: "24h" }
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
    privateNumber: existingUser.privateNumber,
    token: token,
  });
};

const updateUser = async (req, res, next) => {
  const userId = req.params.userId;
  console.log(userId);

  const { privateNumber, fullName, commandId } = req.body;
  console.log(req.body);

  try {
    // Find the user by ID
    const user = await User.findByPk(userId);

    // If user not found, return null or handle accordingly
    if (!user) {
      const error = new HttpError(
        `Could not update user ${userId}, user doesn't exist.`,
        403
      );
      return next(error);
    }

    // Update the user fields
    if (privateNumber !== undefined) {
      user.privateNumber = privateNumber;
    }

    if (fullName !== undefined) {
      user.fullName = fullName;
    }

    if (commandId !== undefined) {
      user.commandId = commandId;
    }

    // Save the updated user
    await user.save();

    // Return the updated user
    res
      .status(200)
      .json({ message: `User ${userId} updated successfully.`, user });
  } catch (err) {
    // Handle errors
    console.error(err);
    const error = new HttpError(
      `Could not update user ${userId}, please try again later.`,
      500
    );
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new HttpError("failed to delete user, try later.", 422);
    }

    const userId = req.params.userId;
    console.log(userId);

    let userById;
    try {
      userById = await User.findOne({
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

    res.status(201).json({ message: `DELETE:  ${userId}` });
  } catch (error) {
    next(error); // Send the error to the error-handling middleware
  }
};

exports.getUsers = getUsers;
exports.getUserById = getUserById;
exports.login = login;
exports.signup = signup;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
