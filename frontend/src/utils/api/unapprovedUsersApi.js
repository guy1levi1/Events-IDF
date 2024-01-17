import { get } from "./api";

export async function getUnapprovedUsers() {
  const apiUrl = "http://localhost:5000/api/unapprovedUsers/";

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
    console.error("Error fetching unapproved users:", error);
    throw error; // Rethrow the error to handle it in the calling code
  }
}

export async function getUnapprovedUserById(unApprovedUserId) {
  try {
    const unApprovedUsers = await getUnapprovedUsers();

    for (let i = 0; i < unApprovedUsers.length; i++) {
      if (unApprovedUsers[i].id === unApprovedUserId) {
        return unApprovedUsers[i];
      }
    }

    // If no matching commandName is found
    return null;
  } catch (error) {
    console.error("Error getting unapproved user by id:", error);
    throw error; // Rethrow the error to handle it in the calling code
  }
}

export async function getUnapprovedUserIdByFullName(fullName) {
  try {
    const unapprovedUsers = await getUnapprovedUsers();

    for (let i = 0; i < unapprovedUsers.length; i++) {
      if (unapprovedUsers[i].fullName === fullName) {
        return unapprovedUsers[i].id;
      }
    }

    // If no matching fullNames is found
    return null;
  } catch (error) {
    console.error("Error getting userId by unapproved fullname:", error);
    throw error; // Rethrow the error to handle it in the calling code
  }
}

export async function getUnapprovedFullNameById(userId) {
  try {
    const unapprovedUsers = await getUnapprovedUsers();

    for (let i = 0; i < unapprovedUsers.length; i++) {
      if (unapprovedUsers[i].id === userId) {
        return unapprovedUsers[i].fullName;
      }
    }

    // If no matching commandName is found
    return null;
  } catch (error) {
    console.error("Error getting unapproved fullname by id:", error);
    throw error; // Rethrow the error to handle it in the calling code
  }
}

export async function createUnapprovedUser(newUnApprovedUser) {
  const apiUrl = "http://localhost:5000/api/events/";

  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    "Access-Control-Allow-Methods": "POST",
  };

  try {
    const response = await post(apiUrl, newUnApprovedUser, headers);
    console.log("Server response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating new event:", error);
    return error;
  }
}

export async function deleteUnapprovedUserById(unApprovedUserId) {
  const apiUrl = `http://localhost:5000/api/unApprovedUsers/${unApprovedUserId}`;

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
    console.error(`Error deleting event with ID ${unApprovedUserId}:`, error);
    throw error;
  }
}
