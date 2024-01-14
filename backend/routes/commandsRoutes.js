const express = require("express");

const commandsController = require("../controllers/commandsControllers");

const router = express.Router();

router.get("/", commandsController.getAllCommands);

router.get("/:commandId", commandsController.getCommandById);

router.post("/", commandsController.createCommand);

router.patch("/:commandId", commandsController.updateCommandById);

router.delete("/:commandId", commandsController.deleteCommandById);

module.exports = router;
