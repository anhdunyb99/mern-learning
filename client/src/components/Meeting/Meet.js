import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../contexts/SocketContexts";

const Meet = () => {
  const { socket } = useSocket();
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [roomId, setRoomId] = useState();

  const handleRoomJoined = useCallback(
    ({ roomId }) => {
      navigate(`/room/${roomId}`);
    },
    [navigate]
  );

  useEffect(() => {
    socket.on("joined-room", handleRoomJoined);
    return () => {
      socket.off("joined-room", handleRoomJoined);
    };
  }, [handleRoomJoined, socket]);
  const handleJoinRoom = () => {
    socket.emit("join-room", { emailId: email, roomId });
  };
  /* socket.emit("join-room", { roomId: "1", emailId: "any@ex.com" });
  console.log("socket", socket); */
  return (
    <div className="container">
      <div>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Enter your email here"
        />
        <input
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          type="text"
          placeholder="Enter your room here"
        />
        <button onClick={handleJoinRoom}>Enter Room</button>
      </div>
    </div>
  );
};

export default Meet;
