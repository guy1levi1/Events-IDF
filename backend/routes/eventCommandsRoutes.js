const express = require("express");

const eventCommandsController = require("../controllers/eventCommandsControllers");

const router = express.Router();

const checkAuth = require("../middlewares/checkAuth");

router.use(checkAuth);

// get all rows
router.get("/", eventCommandsController.getAllEventsCommands);

// get all rows by eventId column
router.get("/:eventId", eventCommandsController.getEventCommandsByEventId);

// add a new row - (body: id, eventId,commandId)
router.post("/", eventCommandsController.createEventCommand);

// send commandId in body and delete a rows that eventId = :eventId and commandId is the commandId in the body
router.delete("/:eventId", eventCommandsController.deleteEventCommand);

// delete all command for a specific event
router.delete(
  "allEventCommnadByEventId/:eventId",
  eventCommandsController.deleteAllEventCommandsByEventId
);

module.exports = router;
