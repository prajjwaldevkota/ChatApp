/* eslint-disable react/prop-types */

function extractBeforeSays(sentence) {
  const saysIndex = sentence.indexOf("says");

  if (saysIndex !== -1) {
    const beforeSays = sentence.substring(0, saysIndex).trim();
    return beforeSays;
  } else {
    return sentence.trim();
  }
}

const Triangle = (props) => {
  const currentUserRoom = props.currentUser.room;
  const isFromCurrentUser =
    extractBeforeSays(props.msg.from) === props.currentUser.name;
  const isFromUserInSameRoom =
    props.room === currentUserRoom && !isFromCurrentUser;

  const leftPosition = `${
    isFromCurrentUser ? "250px" : isFromUserInSameRoom ? "20px" : ""
  }`;

  return (
    <div
      style={{
        content: "" /* triangle */,
        position: "absolute",
        bottom: "-2vh" /* value = - border-top-width - border-bottom-width */,
        left: leftPosition /* controls horizontal position */,
        borderWidth:
          "15px 15px 0" /* vary these values to change the angle of the vertex */,
        borderStyle: "solid",
        borderColor: `${props.color} transparent`,
      }}
    />
  );
};
export default Triangle;
