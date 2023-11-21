import express from "express";
import path from "path";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: "*",
  },
});

app.use(cors());
app.use(express.static("app"));

const indexPath = path.join(process.cwd(), "app", "index.html");

app.get("*", (req, res) => {
  res.sendFile(indexPath);
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//************************* */
io.on("connection", (socket) => {
    console.log("A user connected");
  
    // Handling client data
    socket.on("clientData", (data) => {
      console.log("Received data from the client:", data);
  
      // Sending data back to the client
      socket.emit("serverData", { message: "Hello from the server!" });
    });
  
    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });


