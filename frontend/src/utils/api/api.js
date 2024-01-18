import axios from "axios";

const handelErrorCode = (code) => {
  switch (code) {
    case 409:
      return "המשתמש כבר קיים נסה להתחבר במקום";
    case 404:
      return "המשתמש אינו קיים";
    case 401:
      return "לא ניתן להתחבר, סיסמא שגויה";
    case 500:
      return "השרת לא מגיב, נסה שנית מאוחר יותר";
    case 402:
      return "לא הצלחנו למצוא את האירוע המבוקש";
    default:
      break;
  }
};

export const get = async (url, headers) => {
  try {
    const res = await axios.get(url, { headers });
    if (res) {
      console.log("success get");
      return res;
    }
  } catch (e) {
    console.log(e);
  }
};

export const post = async (url, body, headers) => {
  try {
    const res = await axios.post(url, body, { headers });
    if (res) {
      console.log("success post");
    }
    return res;
  } catch (e) {
    console.log(e.response.status);
    const massage = handelErrorCode(e.response.status);
    const code = e.response.status;
    throw {
      massage: massage || "unocurred error",
      code: code || 500,
    };
  }
};

export const patch = async (url, body, headers) => {
  try {
    const res = await axios.patch(url, body, { headers });
    if (res) {
      console.log("success patch");
    }
  } catch (e) {
    console.log(e);
  }
};

export const del = async (url, headers) => {
  try {
    const res = await axios.delete(url, { headers });
    if (res) {
      console.log("success delete");
    }
    return res;
  } catch (e) {
    console.log(e.response.status);
    const massage = handelErrorCode(e.response.status);
    const code = e.response.status;
    throw {
      massage: massage || "unocurred error",
      code: code || 500,
    };
  }
};
