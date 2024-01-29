import axios from "axios";
import { io } from "socket.io-client";
import { Platform } from "react-native";

// const baseURL =
//   Platform.OS === "android"
//     ? "http://100.64.1.230:8000"
//     : "http://localhost:8000";

const baseURL = "https://spoti-joint.onrender.com";

export default axios.create({ baseURL });
export const socket = io(baseURL, { autoConnect: false });
