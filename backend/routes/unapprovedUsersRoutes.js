const express = require("express");

const unapprovedUsersController = require("../controllers/unapprovedUsersControllers");

const router = express.Router();

router.get("/", unapprovedUsersController.getUnapprovedUsers);

router.delete(
  "/:unapprovedUserId",
  unapprovedUsersController.deleteUnapprovedUser
);

module.exports = router;
