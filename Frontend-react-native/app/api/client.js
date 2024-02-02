import axios from "axios";
import { io } from "socket.io-client";
import { Platform } from "react-native";

// const baseURL =
//   Platform.OS === "android"
//     ? "http://100.64.1.230:8000"
//     : "http://localhost:8000";

import axios from "axios";
import { io } from "socket.io-client";

const baseURL = "https://spoti-joint.onrender.com";

const client = axios.create({ baseURL });
const socket = io(baseURL, { autoConnect: false });

const login = async ({ email, password }) => {
  try {
    const res = await api.post("/login", { email, password });
    if (res.data.success) {
      return {
        user: res.data.user,
        token: res.data.token,
        err: null,
      };
    } else {
      return {
        user: null,
        token: null,
        err: res.data.message,
      };
    }
  } catch (error) {
    console.log(`Erorr logging in ${error}`);
  }
};

export { client, socket, login };
