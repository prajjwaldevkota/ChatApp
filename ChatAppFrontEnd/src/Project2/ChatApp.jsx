/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect, useRef, useReducer } from "react";
import io from "socket.io-client";
import PersonIcon from "@mui/icons-material/Person";
import { ThemeProvider } from "@emotion/react";
import {
  Card,
  CardHeader,
  CardContent,
  TextField,
  Typography,
  AppBar,
  Toolbar,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  Icon,
} from "@mui/material";
import theme from "./projectTheme";
import ChatMsg from "./chatMessage";
import image from "/LogoChat.png";
import Image from "mui-image";
import TopBar from "./topbar";
import "../App.css";

const ChatApp = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [messages, setMessages] = useState([]);
  const [showjoinFields, setShowJoinFields] = useState(true);
  const [status, setStatus] = useState("");
  const [radio, setRadio] = useState(null);
  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [rooms, setRooms] = useState(() => {
    const savedRooms = sessionStorage.getItem("rooms");
    return savedRooms ? JSON.parse(savedRooms) : ["main"];
  });
  const [roomsAndUsers, setRoomsAndUsers] = useState({});
  const handleOpenDialog = () => setOpen(true);
  const handleCloseDialog = () => setOpen(false);
  const initialState = {
    msg: "",
    roomMsg: "",
    contactServer: false,
    isTyping: false,
    typingMsg: "",
    message: "",
  };
  const reducer = (state, newState) => ({ ...state, ...newState });
  const [state, setState] = useReducer(reducer, initialState);
  const effectRan = useRef(false);

  useEffect(() => {
    if (effectRan.current) return;
    effectRan.current = true;
  }, []);

  useEffect(() => {
    sessionStorage.setItem("rooms", JSON.stringify(rooms));
  }, [rooms]);

  const handleNameInput = (e) => {
    setName(e.target.value);
    setStatus("");
  };

  const handleRoomInput = (e) => {
    setRoom(e.target.value);
    setRadio(e.target.value);
  };

  const handleRadioChange = (event) => {
    const selectedRoom = event.target.value;
    setRadio(selectedRoom);
    setRoom(selectedRoom);
  };

  const handleSignIn = (userName, roomName) => {
    setCurrentUser({ name: userName, room: roomName });
  };

  const getRandomColor = () => {
    // Generate a random hexadecimal color code
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  };

  const onJoinClick = () => {
    try {
      state.contactServer = true;
      const socket = io.connect("localhost:5000", {
        forceNew: true,
        transports: ["websocket"],
        autoConnect: true,
        reconnection: false,
        timeout: 5000,
      });
     // const socket = io.connect();

      socket.emit("join", { name: name, room: room }, (err) => {
        console.log(err);
      });

      handleSignIn(name, room);

      socket.on("nameexists", onExists);
      socket.on("welcome", addMessageToList);
      socket.on("someonejoined", addMessageToList);
      socket.on("someoneleft", addMessage);
      socket.on("someoneistyping", onTyping);
      socket.on("newmessage", onNewMessage);
      socket.on("roomsAndUsers", getRoomsAndUsers);
      setState({ socket: socket });

      if (socket.io._readyState === "opening") {
        setState({ msg: "can't get connection - try later!" });
        sessionStorage.removeItem("rooms");
        setRooms(["main"]);
      }
    } catch (err) {
      console.log(err);
      setState({ msg: "some other problem occurred" });
    }
  };

  const onExists = (msg) => {
    setStatus(msg);
  };

  const addMessageToList = (msg) => {
    setShowJoinFields(false);
    setMessages((prevMessages) => [...prevMessages, msg]);
  };

  const addMessage = (msg) => {
    setShowJoinFields(false);
    setMessages((prevMessages) => [...prevMessages, msg]);
  };

  const onTyping = (from) => {
    if (from !== name) {
      setState({ typingMsg: `${from} is typing...` });
    }
  };

  const onNewMessage = (msg) => {
    addMessage(msg);
    setState({ typingMsg: "" });
  };

  const getRoomsAndUsers = (data) => {
    const newRooms = Object.keys(data);

    // Update the `rooms` state with the new rooms
    setRooms((prevRooms) => {
      // Create a new array that includes all previous rooms and any new rooms
      const updatedRooms = [
        ...prevRooms,
        ...newRooms.filter((room) => !prevRooms.includes(room)),
      ];
      return updatedRooms;
    });

    // Update the `roomsAndUsers` state with the received data
    setRoomsAndUsers(data);
  };

  const onMessageChange = (e) => {
    setState({ message: e.target.value });
    if (state.isTyping === false) {
      state.socket.emit("typing", { from: name }, (err) => {
        console.log(err);
      });
      setState({ isTyping: true });
    }
  };

  const handleSendMessage = (e) => {
    if (state.message !== "") {
      state.socket.emit(
        "message",
        { from: name, text: state.message },
        (err) => {
          console.log(err);
        }
      );
      setState({ isTyping: false, message: "" });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      {showjoinFields ? (
        <div>
          <AppBar color="secondary" style={{ marginBottom: "5vh" }}>
            <Toolbar>
              <Typography variant="h6" color="inherit">
                Chat it Up! - Info3139
              </Typography>
              <section
                style={{ height: 70, width: 70, marginLeft: "auto" }}
              ></section>
            </Toolbar>
          </AppBar>
          <Card className="card">
            <Image
              src={image}
              style={{
                height: 170,
                width: 140,
                display: "block",
                margin: "auto",
              }}
            />
            <CardHeader
              title="Sign In"
              style={{ textAlign: "center", padding: "0vh", marginTop: "0vh" }}
            />
            <CardContent>
              <Card>
                <TextField
                  style={{
                    marginTop: "2vh",
                    marginLeft: "2vh",
                    marginBottom: "3vh",
                    padding: "1vh",
                  }}
                  onChange={handleNameInput}
                  placeholder="Enter Chat name"
                  value={name}
                  error={status !== ""}
                  helperText={status}
                ></TextField>
              </Card>
              <Card>
                <Typography
                  style={{
                    marginTop: "2vh",
                    marginLeft: "2vh",
                    fontSize: "16px",
                  }}
                >
                  Join Existing or Enter Room Name
                </Typography>
                <RadioGroup
                  value={radio}
                  onChange={handleRadioChange}
                  style={{ margin: "auto", marginLeft: "2vh" }}
                >
                  {rooms.map((roomName, index) => (
                    <FormControlLabel
                      key={index}
                      value={roomName}
                      control={<Radio />}
                      label={roomName}
                    />
                  ))}
                </RadioGroup>
                <TextField
                  style={{
                    marginTop: "1vh",
                    marginLeft: "2vh",
                    marginBottom: "5vh",
                    padding: "1vh",
                  }}
                  onChange={handleRoomInput}
                  value={room}
                  placeholder="Enter Room Name"
                ></TextField>
              </Card>

              <Button
                variant="contained"
                onClick={onJoinClick}
                disabled={name === "" || room === ""}
                style={{
                  marginRight: "auto",
                  marginTop: "2vh",
                  display: "block",
                }}
              >
                Join Room
              </Button>
            </CardContent>
          </Card>
        </div>
      ) : null}

      {!showjoinFields ? (
        <div>
          <Card style={{ display: 'flex', flexDirection: 'column', height: '95vh' }}>
            <TopBar viewDialog={handleOpenDialog} />
            <Dialog
              open={open}
              onClose={handleCloseDialog}
              style={{ margin: 20 }}
            >
              <DialogTitle style={{ textAlign: "center" }}>
                Who&apos;s on?
              </DialogTitle>
              <DialogContent style={{ display: "block" }}>
                {Object.entries(roomsAndUsers).map(([roomName, usersSet]) => (
                  <div
                    key={roomName}
                    style={{ fontSize: "19px", padding: "0em" }}
                  >
                    {Array.from(usersSet).map((user, index) => (
                      <div
                        key={index}
                        style={{
                          marginTop: "1em",
                          padding: "0em",
                          marginLeft: "1px",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Icon style={{ marginRight: "0.9em" }}>
                          <PersonIcon
                            style={{
                              color: getRandomColor(),
                              padding: "0em",
                              marginTop: "-1em",
                            }}
                          ></PersonIcon>
                        </Icon>
                        <span>{`${user} is in room ${roomName}`}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </DialogContent>
            </Dialog>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <CardContent style={{ flexGrow: 1, maxHeight: '80vh', overflowY: 'auto' }}>
                <div
                  className="scenario-container"
                  style={{
                    fontSize: "20px",
                    fontWeight: "bolder",
                    marginTop: "2.5em",
                  }}
                >
                  {messages.map((message, index) => (
                    <ChatMsg
                      msg={message}
                      key={index}
                      room={room}
                      currentUser={currentUser}
                    />
                  ))}
                </div>
              </CardContent>
              <div
                style={{
                  position: "relative",
                  borderTop: "1px solid #ccc",
                  padding: "1rem",
                  marginTop: "auto",
                }}
              >
                <TextField
                  style={{ width: "90%", marginBottom: "1rem" }}
                  onChange={onMessageChange}
                  placeholder="Type something here"
                  autoFocus={true}
                  value={state.message}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleSendMessage();
                      e.target.blur();
                    }
                  }}
                />
                <Typography
                  color="secondary"
                  fontSize={18}
                  fontWeight={"bold"}
                  marginTop={"-0.5em"}
                >
                  {state.typingMsg}
                </Typography>
              </div>
            </div>
          </Card>
        </div>
      ) : null}
    </ThemeProvider>
  );
};
export default ChatApp;
