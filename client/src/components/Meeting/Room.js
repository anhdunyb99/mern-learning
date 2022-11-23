import React, { useCallback, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { usePeer } from "../contexts/PeerContexts";
import { useSocket } from "../contexts/SocketContexts";
const Room = () => {
  const { socket } = useSocket();
  const {
    peer,
    createOffer,
    createAnswere,
    setRemoteAns,
    sendStream,
    remoteStream,
  } = usePeer();

  const [myStream, setMyStream] = useState(null);
  const [remoteEmailId, setRemoteEmailId] = useState();
  const handleNewUserJoined = useCallback(
    async (data) => {
      const { emailId } = data;
      console.log("New user joined room", emailId);
      const offer = await createOffer();
      socket.emit("call-user", { emailId, offer });
      setRemoteEmailId(emailId);
    },
    [createOffer, socket]
  );

  const handleIncomingCall = useCallback(
    async (data) => {
      const { from, offer } = data;
      console.log("Incomming call ", from, offer);
      const ans = await createAnswere(offer);
      socket.emit("call-accepted", { emailId: from, ans });
      setRemoteEmailId(from);
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
      audio: true,
      video: true,
    });
    setMyStream(stream);
  }, []);

  const handleNegosiation = useCallback(async () => {
    const localOffer = await peer.localDescription;
    socket.emit("call-user", { emailId: remoteEmailId, offer: localOffer });
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
    peer.addEventListener("negotiationneeded", handleNegosiation);
    return () => {
      peer.removeEventListener("negotiationneeded", handleNegosiation);
    };
  }, []);

  useEffect(() => {
    getUserMediaStream();
  }, [getUserMediaStream]);
  return (
    <div>
      <h1>Room Page</h1>
      <h4>You are connected to {remoteEmailId} </h4>
      <button onClick={(e) => sendStream(myStream)}>Send my video</button>
      <ReactPlayer url={myStream} playing muted />
      <ReactPlayer url={remoteStream} playing />
    </div>
  );
};

export default Room;
