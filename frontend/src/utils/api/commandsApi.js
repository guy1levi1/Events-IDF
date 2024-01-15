import { get } from "./api";

export async function getCommands() {
  const apiUrl = "http://localhost:5000/api/commands/";

  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE",
  };

  try {
    const response = await get(apiUrl, headers);
    console.log("Server response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching commands:", error);
    throw error; // Rethrow the error to handle it in the calling code
  }
}

export async function getCommandIdByName(commandName) {
  try {
    const commands = await getCommands();

    for (let i = 0; i < commands.length; i++) {
      if (commands[i].commandName === commandName) {
        return commands[i].id;
      }
    }

    // If no matching commandName is found
    return null;
  } catch (error) {
    console.error("Error getting commandId by name:", error);
    throw error; // Rethrow the error to handle it in the calling code
  }
}


export async function getCommandNameById(commandId) {
  try {
    const commands = await getCommands();

    for (let i = 0; i < commands.length; i++) {
      if (commands[i].commandId === commandId) {
        return commands[i].commandName;
      }
    }

    // If no matching commandName is found
    return null;
  } catch (error) {
    console.error("Error getting command name by id:", error);
    throw error; // Rethrow the error to handle it in the calling code
  }
}

