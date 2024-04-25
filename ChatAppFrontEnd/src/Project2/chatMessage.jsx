/* eslint-disable react/prop-types */
import "../App.css";
import { useEffect, useRef } from "react";
import { ListItem } from "@mui/material";
import Bubble from "./bubble";
import Triangle from "./Traingle";
const ChatMsg = (props) => {
  const userRef = useRef(null);
  useEffect(() => {
    userRef.current.scrollIntoView(true);
  }, []);
  return (
    <div>
      <ListItem 
        ref={userRef}
        style={{ textAlign: "left", marginBottom: "0vh" }}
      >
        <Bubble msg={props.msg} room={props.room} color={props.msg.color} currentUser = {props.currentUser} />
        <Triangle msg={props.msg} color={props.msg.color} currentUser = {props.currentUser}/>
      </ListItem>
      <p></p>
    </div>
  );
};
export default ChatMsg;
