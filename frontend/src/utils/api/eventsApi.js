import { del, get, patch, post } from "./api";

export async function getEvnets(token) {
  const apiUrl = "http://localhost:5000/api/events/";

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

export async function createEvent(newEvent) {
  const apiUrl = "http://localhost:5000/api/events/";

  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    "Access-Control-Allow-Methods": "POST",
  };
  try {
    const response = await post(apiUrl, newEvent, headers);
    console.log("Server response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating new event:", error);
    return error;
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
  };

  try {
    const response = await patch(apiUrl, updatedEventData, headers);
    console.log("Server response:", response.data);
    return response.data;
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
  };

  try {
    const response = await del(apiUrl, headers);
    console.log("Server response:", response.data);
    return response.data;
  } catch (error) {
    console.error(`Error deleting event with ID ${eventId}:`, error);
    throw error;
  }
}
