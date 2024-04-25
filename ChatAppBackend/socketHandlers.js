const usersByRoom = {};
import moment from "moment";

import matColours from "./matdes100colours.json" assert { type: "json" };

function generateRandomColor() {
  const colorIdx = Math.floor(Math.random() * matColours.colours.length);
  const color = matColours.colours[colorIdx];
  return color;
}

export function handleJoin(socket, client) {
  const { name, room } = client;
  if (!usersByRoom[room]) {
    usersByRoom[room] = [];
  }

  if (usersByRoom[room].includes(name)) {
    socket.emit(
      "nameexists",
      "Username already in use. Please choose a different one."
    );
  } else {
    socket.name = name;
    socket.room = room;
    socket.join(room);

    // Generate a random color
    const adminColor = "#8a2be2";

    // Assign a random color to the user
    const userColor = generateRandomColor();

    // Store the user's color in usersByRoom object
    usersByRoom[room][name] = { color: userColor };

    // Emit welcome message from "ADMIN" with random color
    socket.emit("welcome", {
      from: `ADMIN says:`,
      time: `@${moment().format("h:mm:ss a")}`,
      text: `Welcome, ${name}!`,
      color: adminColor,
    });

    socket.to(room).emit("someonejoined", {
      from: `ADMIN says:`,
      time: `@${moment().format("h:mm:ss a")}`,
      text: `${name} has joined the room`,
      color: adminColor,
    });

    usersByRoom[room].push(name); // Push the user name into the array for the room
  }
}

export function handleDisconnect(socket) {
  const color = "#8a2be2";
  const room = socket.room;
  const user = socket.name;

  if (user && room && usersByRoom[room]) {
    socket.to(room).emit("someoneleft", {
      from: `ADMIN says`,
      time: `@${moment().format("h:mm:ss a")}`,
      text: `${user} has left the room, ${room}`,
      color,
    });
    usersByRoom[room] = usersByRoom[room].filter(
      (username) => username !== user
    );
  }
}

export function handleTyping(socket, client) {
  const { from } = client;
  const room = socket.room;
  socket.to(room).emit("someoneistyping", from);
}

export function handleMessage(io, socket, client) {
  // Generate a random color
  const { from, text } = client;
  const room = socket.room;

  const userColor = usersByRoom[room][from]
    ? usersByRoom[room][from].color
    : generateRandomColor();

  const msg = {
    from: `${from} says :`,
    time: `@${moment().format("h:mm:ss a")}`,
    text,
    color: userColor,
  };
  io.in(room).emit("newmessage", msg);
}

export function handleGetRoomsAndUsers(io) {
  io.emit("roomsAndUsers", usersByRoom);
}


