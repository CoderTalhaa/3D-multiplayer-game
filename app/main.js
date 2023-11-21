import "./main.css";
import Experience from "./Experience/Experience.js";
import {io} from "socket.io-client"

const experience = new Experience(
  document.querySelector("canvas.experience-canvas")
);


// const socket = io("http://localhost:3000");

// socket.emit("clientData", { message: "Hello from the client!" });

// socket.on("serverData", (data) => {
//   console.log("Received data from the server:", data);
// });