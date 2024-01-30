const express = require("express");

const eventsController = require("../controllers/eventsControllers");

const router = express.Router();

const checkAuth = require("../middlewares/checkAuth");

router.use(checkAuth);

router.get("/byCommand/:commandId", eventsController.getEventsByCommandId);

router.get("/", eventsController.getEvents);

router.get("/:eventId", eventsController.getEventById);

router.post("/", eventsController.createEvent);

router.delete("/:eventId", eventsController.deleteEvent);

router.patch("/:eventId", eventsController.updateEvent);

module.exports = router;
