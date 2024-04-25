import { port } from "./config.js";
import express from "express";
import http from "http";
import { Server } from "socket.io";
import * as socketHandler from "./socketHandlers.js";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // To parse the incoming requests with JSON payloads
app.use(express.static("public"));
let httpServer = http.createServer(app);
app.get("/", (req, res) => res.send("<h1>Hello World From Express</h1>"));
// Socket.io server
process.env.TZ = "America/New_York";
const io = new Server(httpServer, {});
// main socket routine
io.on("connection", (socket) => {

    socket.on("join", (client) => {
        socketHandler.handleJoin(socket, client);
        socketHandler.handleGetRoomsAndUsers(io);
    });

    socket.on("disconnect",()=>{
        socketHandler.handleDisconnect(socket);
        socketHandler.handleGetRoomsAndUsers(io);
    })

    socket.on("typing",(client)=>{
        socketHandler.handleTyping(socket,client);
    })

    socket.on("message",(client)=>{
        socketHandler.handleMessage(io,socket,client);
    })
});
// error handler middleware
app.use((error, req, res, next) => {
    res.status(error.status || 500).send({
        error: {
            status: error.status || 500,
            message: error.message || "Internal Server Error",
        },
    });
});
httpServer.listen(port, () => {
    console.log(`listening on port ${port}`);
});