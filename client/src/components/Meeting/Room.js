import React, { useCallback, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { usePeer } from "../contexts/PeerContexts";
import { useSocket } from "../contexts/SocketContexts";
const Room = () => {
  const { socket } = useSocket();
  const { peer, createOffer, createAnswere, setRemoteAns } = usePeer();

  const [myStream, setMyStream] = useState(null);
  const handleNewUserJoined = useCallback(
    async (data) => {
      const { emailId } = data;
      console.log("New user joined room", emailId);
      const offer = await createOffer();
      socket.emit("call-user", { emailId, offer });
    },
    [createOffer, socket]
  );

  const handleIncomingCall = useCallback(
    async (data) => {
      const { from, offer } = data;
      console.log("Incomming call ", from, offer);
      const ans = await createAnswere(offer);
      socket.emit("call-accepted", { emailId: from, ans });
    },
    [createAnswere, socket]
  );

  const handleCallAccepted = useCallback(
    async (data) => {
      const { ans } = data;
      console.log("Call Got Accepted", ans);
      await setRemoteAns(ans);
    },
    [setRemoteAns]
  );

  const getUserMediaStream = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
        audio : true,
        video : true,
    });
    setMyStream(stream);
  }, []);

  useEffect(() => {
    socket.on("user-joined", handleNewUserJoined);
    socket.on("incomming-call", handleIncomingCall);
    socket.on("call-accepted", handleCallAccepted);
    return () => {
      socket.off("user-joined", handleNewUserJoined);
      socket.off("incomming-call", handleIncomingCall);
      socket.on("call-accepted", handleCallAccepted);
    };
  }, [handleCallAccepted, handleIncomingCall, handleNewUserJoined, socket]);

  useEffect(() => {
    getUserMediaStream();
  }, [getUserMediaStream]);
  return (
    <div>
      <h1>Room Page</h1>
      <ReactPlayer url={myStream} playing />
    </div>
  );
};

export default Room;
