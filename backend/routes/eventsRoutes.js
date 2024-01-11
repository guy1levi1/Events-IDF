const express = require("express");
// const { check } = require("express-validator");

const eventsController = require("../controllers/eventsControllers");

const router = express.Router();

router.get("/", eventsController.getEvents);
router.get("/:eventId", eventsController.deleteEvent);
router.delete("/:eventId", eventsController.deleteEvent);
router.patch("/:eventId", eventsController.updateEvent);

module.exports = router;
