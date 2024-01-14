const express = require("express");

const eventRequestsController = require("../controllers/eventRequestsControllers");

const router = express.Router();

// ✅
router.get("/", eventRequestsController.geteventsRequests);

// ✅
router.get("/:eventRequestId", eventRequestsController.geteventRequestsById);

// ✅
router.get(
  "/eventId/:eventId",
  eventRequestsController.getEventRequestsByEventId
);

// ✅
router.post("/", eventRequestsController.createEventRequests);

// ✅
router.delete("/:eventRequestId", eventRequestsController.deleteEventRequests);

module.exports = router;
