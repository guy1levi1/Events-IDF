import { del, get, patch, post } from "./api";
import { getCommandNameById } from "./commandsApi";

export async function getUsers() {
  const apiUrl = "http://localhost:5000/api/users/";

  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    "Access-Control-Allow-Methods": "GET",
  };

  try {
    const response = await get(apiUrl, headers);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error; // Rethrow the error to handle it in the calling code
  }
}

export async function getUserById(userId) {
  try {
    const users = await getUsers();

    for (let i = 0; i < users.length; i++) {
      if (users[i].id === userId) {
        return users[i];
      }
    }

    // If no matching commandName is found
    return null;
  } catch (error) {
    console.error("Error getting user by id:", error);
    throw error; // Rethrow the error to handle it in the calling code
  }
}

export async function getUserIdByFullName(fullName) {
  try {
    const users = await getUsers();

    for (let i = 0; i < users.length; i++) {
      if (users[i].fullName === fullName) {
        return users[i].id;
      }
    }

    // If no matching fullNames is found
    return null;
  } catch (error) {
    console.error("Error getting userId by fullname:", error);
    throw error; // Rethrow the error to handle it in the calling code
  }
}

export async function getFullNameById(userId) {
  try {
    const users = await getUsers();

    for (let i = 0; i < users.length; i++) {
      if (users[i].id === userId) {
        return users[i].fullName;
      }
    }

    // If no matching commandName is found
    return null;
  } catch (error) {
    console.error("Error getting fullname by id:", error);
    throw error; // Rethrow the error to handle it in the calling code
  }
}

export async function getCommandNameByUserId(userId) {
  try {
    const users = await getUsers();
    let commantName = "";

    for (let i = 0; i < users.length; i++) {
      if (users[i].id === userId) {
        commantName = await getCommandNameById(users[i].commandId);
        return commantName;
      }
    }

    // If no matching user/commands is found
    return null;
  } catch (error) {
    console.error("Error getting command name by user id:", error);
    throw error; // Rethrow the error to handle it in the calling code
  }
}


export async function getCommandIdByUserId(userId) {
  try {
    const users = await getUsers();

    for (let i = 0; i < users.length; i++) {
      if (users[i].id === userId) {
        return users[i].commandId;
      }
    }

    // If no matching user/commands is found
    return null;
  } catch (error) {
    console.error("Error getting command ID by user id:", error);
    throw error; // Rethrow the error to handle it in the calling code
  }
}

export async function createUser(newUser) {
  const apiUrl = "http://localhost:5000/api/users/";

  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    "Access-Control-Allow-Methods": "POST",
  };

  try {
    const response = await post(apiUrl, newUser, headers);
    return response.data;
  } catch (error) {
    console.error("Error creating new user:", error);
    return error;
  }
}

export async function updateUser(userId, updatedUserData) {
  const apiUrl = `http://localhost:5000/api/events/${userId}`;

  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    "Access-Control-Allow-Methods": "PATCH",
  };

  try {
    const response = await patch(apiUrl, updatedUserData, headers);
    return response.data;
  } catch (error) {
    console.error(`Error updating user with ID ${userId}:`, error);
    throw error;
  }
}

export async function deleteUser(userId) {
  const apiUrl = `http://localhost:5000/api/users/${userId}`;

  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    "Access-Control-Allow-Methods": "DELETE",
  };

  try {
    const response = await del(apiUrl, headers);
    return response.data;
  } catch (error) {
    console.error(`Error deleting user with ID ${userId}:`, error);
    throw error;
  }
}
