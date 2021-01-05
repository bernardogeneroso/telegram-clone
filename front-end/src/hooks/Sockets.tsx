import React, { createContext, useState, useContext } from "react";
import socketIOClient from "socket.io-client";

import { useAuth } from "./Auth";

interface AuthContextData {
  socket: SocketIOClient.Socket;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const Sockets: React.FC = ({ children }) => {
  const {data: {token}} = useAuth()

  const [socket] = useState(
    socketIOClient(
      process.env.REACT_APP_SERVER_IP_SOCKET || "http://127.0.0.1:3333", {
        autoConnect: true,
        transportOptions: {
          polling: {
            extraHeaders: {
              'authorization': `Bearer ${token}`,
            },
          },
        }
      }
    )
  );

  return (
    <AuthContext.Provider
      value={{
        socket,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useSockets(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an SocketsMessages");
  }

  return context;
}

export { Sockets, useSockets };
