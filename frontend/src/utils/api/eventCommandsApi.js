// Import necessary functions for making API requests
import { get, post, del } from "./api";

// Get all event commands
export async function getAllEventCommands() {
  const apiUrl = "http://localhost:5000/api/eventCommands/";

  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    "Access-Control-Allow-Methods": "GET",
  };

  try {
    const response = await get(apiUrl, headers);
    console.log("Server response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching event commands:", error);
    throw error;
  }
}

// Get event commands by eventId
export async function getEventCommandsByEventId(eventCommandsId) {
  try {
    const eventCommandsByiD = [];
    const eventCommands = await getAllEventCommands();

    for (let i = 0; i < eventCommands.length; i++) {
      if (eventCommands[i].eventId === eventCommandsId) {
        eventCommandsByiD.push(eventCommands[i]);
      }
    }

    return eventCommandsByiD;
  } catch (error) {
    console.error("Error getting all event commands by event id:", error);
    throw error; // Rethrow the error to handle it in the calling code
  }
}

// Create a new event command
export async function createEventCommand(newEventCommand) {
  const apiUrl = "http://localhost:5000/api/eventCommands/";

  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    "Access-Control-Allow-Methods": "POST",
  };

  try {
    const response = await post(apiUrl, newEventCommand, headers);
    console.log("Server response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating event command:", error);
    throw error;
  }
}

// Delete event command by eventId and commandId
export async function deleteEventCommand(eventId, commandId) {
  const apiUrl = `http://localhost:5000/api/eventCommands/${eventId}`;

  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    "Access-Control-Allow-Methods": "DELETE",
  };

  try {
    const response = await del(`${apiUrl}`, { data: { commandId }, headers });

    console.log("Server response:", response.data);
  } catch (error) {
    console.error(
      `Error deleting event command with eventId ${eventId} and commandId ${commandId}:`,
      error
    );
    throw error;
  }
}

// Delete all event commands with a specific eventId
export async function deleteAllEventCommandsByEventId(eventId) {
  const apiUrl = `http://localhost:5000/api/eventCommands/allEventCommnadByEventId/${eventId}`;

  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    "Access-Control-Allow-Methods": "DELETE",
  };

  try {
    const response = await del(apiUrl, headers);
    console.log("Server response:", response.data);
  } catch (error) {
    console.error(
      `Error deleting all event commands for event with id ${eventId}:`,
      error
    );
    throw error;
  }
}
