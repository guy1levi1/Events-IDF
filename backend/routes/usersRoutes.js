const express = require("express");
const { check } = require("express-validator");

const usersController = require("../controllers/usersControllers");

const router = express.Router();

router.get("/", usersController.getUsers);

router.get("/:userId", usersController.getUserById);

router.patch("/:userId", usersController.updateUser);

router.post("/login", usersController.login);

router.delete("/:userId", usersController.deleteUser  );

router.post(
  "/signup",
  [check("name").not().isEmpty(), check("password").isLength({ min: 6 })],
  usersController.signup
);

module.exports = router;
