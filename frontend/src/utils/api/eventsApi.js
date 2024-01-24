import { del, get, patch, post } from "./api";
import { getAllEventCommands } from "./eventCommandsApi";

export async function getEvnets() {
  const apiUrl = "http://localhost:5000/api/events/";

  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    "Access-Control-Allow-Methods": "GET",
    Authorization:
      "Bearer " + JSON.parse(localStorage.getItem("userData"))?.token,
  };

  try {
    const response = await get(apiUrl, headers);
    return response.data;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error; // Rethrow the error to handle it in the calling code
  }
}

export async function getEventById(eventId) {
  try {
    const events = await getEvnets();

    for (let i = 0; i < events.length; i++) {
      if (events[i].id === eventId) {
        return events[i];
      }
    }

    // If no matching commandName is found
    return null;
  } catch (error) {
    console.error("Error getting event by id:", error);
    throw error; // Rethrow the error to handle it in the calling code
  }
}

export async function getEventsByCommandId(commandId) {
  const apiUrl = `http://localhost:5000/api/events/byCommand/${commandId}`;

  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    "Access-Control-Allow-Methods": "GET",
    Authorization:
      "Bearer " + JSON.parse(localStorage.getItem("userData"))?.token,
  };

  try {
    // Fetch all EventCommands with the given commandId
    const eventCommandsAll = await getAllEventCommands();

    // Extract eventIds from the found EventCommands
    const eventIds = eventCommandsAll.map(
      (eventCommand) => eventCommand.eventId
    );

    // Fetch events based on the extracted eventIds
    const response = await get(apiUrl, headers, { params: { eventIds } });
    return response.data;
  } catch (error) {
    console.error(`Error fetching events for command ID ${commandId}:`, error);
    throw error;
  }
}

export async function createEvent(newEvent) {
  const apiUrl = "http://localhost:5000/api/events/";

  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    "Access-Control-Allow-Methods": "POST",
    Authorization:
      "Bearer " + JSON.parse(localStorage.getItem("userData"))?.token,
  };
  try {
    const response = await post(apiUrl, newEvent, headers);
    return response.data;
  } catch (error) {
    console.error("Error creating new event:", error);
    throw error;
  }
}

export async function updateEvent(eventId, updatedEventData) {
  const apiUrl = `http://localhost:5000/api/events/${eventId}`;

  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    "Access-Control-Allow-Methods": "PATCH",
    Authorization:
      "Bearer " + JSON.parse(localStorage.getItem("userData"))?.token,
  };

  try {
    const response = await patch(apiUrl, updatedEventData, headers);
    return response;
  } catch (error) {
    console.error(`Error updating event with ID ${eventId}:`, error);
    throw error;
  }
}

export async function deleteEvent(eventId) {
  const apiUrl = `http://localhost:5000/api/events/${eventId}`;

  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    "Access-Control-Allow-Methods": "DELETE",
    Authorization:
      "Bearer " + JSON.parse(localStorage.getItem("userData"))?.token,
  };

  try {
    const response = await del(apiUrl, headers);
    return response.data;
  } catch (error) {
    console.error(`Error deleting event with ID ${eventId}:`, error);
    throw error;
  }
}
