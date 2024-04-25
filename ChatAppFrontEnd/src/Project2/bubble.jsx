/* eslint-disable react/prop-types */
import "../App.css";

function extractBeforeSays(sentence) {
  // Find the index of "says"
  const saysIndex = sentence.indexOf("says");

  if (saysIndex !== -1) {
    // Extract everything before "says"
    const beforeSays = sentence.substring(0, saysIndex).trim();
    return beforeSays;
  } else {
    // If "says" is not found, return the original string
    return sentence.trim();
  }
}

const Bubble = (props) => {
  const currentUserRoom = props.currentUser.room;
  const isFromCurrentUser =
    extractBeforeSays(props.msg.from) === props.currentUser.name;
  const isFromUserInSameRoom =
    props.room === currentUserRoom && !isFromCurrentUser;

  return (
    <div
      className={`${
        isFromCurrentUser
          ? "userBubble"
          : isFromUserInSameRoom
          ? "otherBubble"
          : ""
      }`}
      style={{ backgroundColor: props.color }}
    >
      <div
        style={{
          fontWeight: "lighter",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>{props.msg.from}</div>
        <div>
          <div style={{ fontWeight: "lighter", marginLeft: "1.75em" }}>
            {" "}
            room:{props.room}
          </div>
          <div style={{ fontWeight: "lighter" }}>{props.msg.time}</div>
        </div>
      </div>

      <div style={{ fontWeight: "bold", marginTop: "10px" }}>
        {props.msg.text}
      </div>
    </div>
  );
};
export default Bubble;
