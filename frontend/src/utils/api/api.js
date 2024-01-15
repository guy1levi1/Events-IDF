import axios from "axios";

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
    console.log(e);
    throw new Error(e);
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
  } catch (e) {
    console.log(e);
  }
};
