const express = require("express");

const eventRequestsController = require("../controllers/eventRequestsControllers");

const router = express.Router();

router.get("/", eventRequestsController.geteventsRequests);

router.get("/:eventId", eventRequestsController.geteventRequestsById);

router.delete("/:eventId", eventRequestsController.updateEventRequests);

router.post("/", eventRequestsController.createEventRequests);

module.exports = router;
