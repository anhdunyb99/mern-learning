import React, { createContext, useMemo } from "react";
import { io } from "socket.io-client";

const SocketContexts = React.createContext();


export const useSocket = () => {
  return React.useContext(SocketContexts);
};

export const SocketProvider = (props) => {
  
  return (
    <SocketContexts.Provider value={{  }}>
      {props.children}

    </SocketContexts.Provider>
  );
};
