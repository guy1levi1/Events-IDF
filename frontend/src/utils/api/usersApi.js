import { get } from "./api";

export async function getUsers() {
  const apiUrl = "http://localhost:5000/api/users/";

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
    console.error("Error fetching users:", error);
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

    for (let i = 0; i < commands.length; i++) {
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
