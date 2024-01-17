const express = require("express");

const eventRequestsController = require("../controllers/eventRequestsControllers");

const router = express.Router();

const checkAuth = require("../middlewares/checkAuth");

router.use(checkAuth);

router.get("/", eventRequestsController.geteventsRequests);

router.get("/:eventRequestId", eventRequestsController.geteventRequestsById);

router.get("/eventId", eventRequestsController.getEventRequestsByEventId);

router.post("/", eventRequestsController.createEventRequest);

router.delete("/:eventRequestId", eventRequestsController.deleteEventRequest);

router.delete("/:eventId", eventRequestsController.deleteAllEventRequestsByEventId);


module.exports = router;
