// Import required modules
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const usersRoutes = require("./routes/usersRoutes");
const eventsRoutes = require("./routes/eventsRoutes");
// const EventCommands = require('./models/schemas/EventCommands');
const unapprovedUsersRoutes = require("./routes/unapprovedUsersRoutes");
const eventRequestsRoutes = require("./routes/eventRequestsRoutes");
const commandsRoutes = require("./routes//commandsRoutes");
const db = require("./dbConfig");
require("./models/relations"); // Import the relations file

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const port = process.env.PORT || 5000;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/api/unapprovedUsers", unapprovedUsersRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/events", eventsRoutes);
app.use("/api/eventRequests", eventRequestsRoutes);
app.use("/api/commands", commandsRoutes);

// Start the server
app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
  try {
    await db.authenticate();
    console.log(
      "Connection to the database has been established successfully."
    );

    // Sync all models
    await db.sync({ force: false });

    console.log("All models synchronized successfully");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
