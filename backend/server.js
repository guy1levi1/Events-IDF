// Import required modules
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const usersRoutes = require('./routes/usersRoutes');
const eventsRoutes = require('./routes/eventsRoutes');
// const EventCommands = require('./models/schemas/EventCommands');

const db = require("./dbConfig");

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

app.use('/api/users', usersRoutes);
app.use('/api/events', eventsRoutes);

// app.use('/api/eventCommands', eventCommandsRoutes)

// app.use((req, res, next) => {
//   const error = new Error("Could not find this route.", 404);
//   throw error;
// });

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  db
  .sync()
  .then((result) => {
    console.log("Database synced successfully:")
  })
  .catch((err) => {
    console.log(err);
  });
});
