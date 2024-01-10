const express = require("express");
// const { check } = require("express-validator");

const eventsController = require("../controllers/eventsControllers");

const router = express.Router();

router.get("/", eventsController.getEvents);
router.delete("/", eventsController.deleteEvent);

module.exports = router;