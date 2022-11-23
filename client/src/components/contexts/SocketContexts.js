import React, { createContext, useMemo } from "react";
import { io } from "socket.io-client";

const SocketContexts = React.createContext();

export const useSocket = () => {
  return React.useContext(SocketContexts);
};

export const SocketProvider = (props) => {
  const socket = useMemo(() => io("http://localhost:5001"), []);
  return (
    <SocketContexts.Provider value={{ socket }}>
      {props.children}
    </SocketContexts.Provider>
  );
};
