const express = require("express");
const { check } = require("express-validator");

const usersController = require("../controllers/usersControllers");

const router = express.Router();

router.get("/", usersController.getUsers);


router.post("/login", usersController.login);

router.post(
  "/signup",
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  usersController.signup
);


module.exports = router;
