import { get, post, patch, del } from "./api"; // Assuming you have these functions for making HTTP requests

export async function getEventRequests() {
  const apiUrl = "http://localhost:5000/api/eventRequests/";

  try {
    const response = await get(apiUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching event requests:", error);
    throw error;
  }
}

export async function getEventRequestsById(eventRequestId) {
  try {
    const eventRequests = await getEventRequests();

    for (let i = 0; i < eventRequests.length; i++) {
      if (eventRequests[i].id === eventRequestId) {
        return eventRequests[i];
      }
    }

    // If no matching commandName is found
    return null;
  } catch (error) {
    console.error("Error getting user by id:", error);
    throw error; // Rethrow the error to handle it in the calling code
  }
}

export async function getEventRequestsByEventId(eventId) {
  try {
    const eventRequestsByEventId = [];
    const eventRequests = await getEventRequests();

    for (let i = 0; i < eventRequests.length; i++) {
      if (eventRequests[i].eventId === eventId) {
        eventRequestsByEventId.push(eventRequests[i]);
      }
    }

    return eventRequestsByEventId;
  } catch (error) {
    console.error("Error getting all event commands by event id:", error);
    throw error; // Rethrow the error to handle it in the calling code
  }
}

export async function createEventRequest(newEventRequest) {
  try {
    const apiUrl = "http://localhost:5000/api/eventRequests/";

    const response = await post(apiUrl, newEventRequest);
    return response.data;
  } catch (error) {
    console.error("Error creating new event request:", error);
    throw error;
  }
}

export async function deleteEventRequest(eventRequestId) {
  try {
    const apiUrl = `http://localhost:5000/api/eventRequests/${eventRequestId}`;

    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept, Authorization",
      "Access-Control-Allow-Methods": "DELETE",
    };

    const response = await del(apiUrl, headers);
    return response.data;
  } catch (error) {
    console.error(
      `Error deleting event request with ID ${eventRequestId}:`,
      error
    );
    throw error;
  }
}

export async function deleteAllEventRequestsByEventId(eventId) {
  try {
    const apiUrl = `http://localhost:5000/api/eventRequests/byEventId/${eventId}`;

    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept, Authorization",
      "Access-Control-Allow-Methods": "DELETE",
    };

    const response = await del(apiUrl, headers);
    return response.data;
  } catch (error) {
    console.error(
      `Error deleting all event requests for event with ID ${eventId}:`,
      error
    );
    throw error;
  }
}
