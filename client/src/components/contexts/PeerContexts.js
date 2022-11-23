import React, { useMemo } from "react";

const PeerContexts = React.createContext(null);

export const usePeer = () => React.useContext(PeerContexts);

export const PeerProvider = (props) => {
  const peer = useMemo(
    () =>
      new RTCPeerConnection({
        iceServers: [
          {
            urls: [
              "stun:stun.l.google.com:19302",
              "stun:global.stun.twilio.com:3478",
            ],
          },
        ],
      }),
    []
  );

  const createOffer = async () => {
    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);
    return offer;
  };

  const createAnswere = async (offer) => {
    await peer.setRemoteDescription(offer);
    const answer = await peer.createAnswer();
    await peer.setLocalDescription(answer);
    return answer;
  };

  const setRemoteAns = async (ans) => {
    await peer.setRemoteDescription(ans);
  };
  return (
    <PeerContexts.Provider
      value={{ peer, createOffer, createAnswere, setRemoteAns }}
    >
      {props.children}
    </PeerContexts.Provider>
  );
};
