import React, { createContext, useState, useContext, useCallback, useEffect } from "react";
import Pusher, { Channel } from 'pusher-js'
import SocketTypes from "pusher-js/types";

import { useAuth } from "./Auth";
import api from "../services/api";

interface Messages {
  id: number;
  message: string;
  message_timestamp: string;
  fullname: string;
}

export interface Rooms {
  id: string;
  name: string;
  image: string;
  fullname: string | null;
  user_message: string | null;
  user_date: string | null;
}

interface AuthContextData {
  socket: SocketTypes;
  messages: Messages[];
  rooms: Rooms[];
  roomSelected: Rooms;
  handleRoomSelected(rooms: Rooms): void;
  createRoom(rooms: Rooms): void;
  leaveChannel(chanel_name: string): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const Sockets: React.FC = ({ children }) => {
  const {data: {token}} = useAuth()

  const [socket] = useState(() => {
    Pusher.logToConsole = true;

    return new Pusher('9804f2768338a8f71fba', {
      cluster: 'eu',
      auth: {
        headers: {
          'authorization': `Bearer ${token}`
        }
      }
    });
  });
  const [chanelName, setChanelName] = useState<Channel>()
  const [rooms, setRooms] = useState<Rooms[]>([])
  const [messages, setMessages] = useState<Messages[]>([])
  const [roomSelected, setRoomSelected] = useState<Rooms>(() => {
    const roomSelectedlocalStorage = localStorage.getItem("Telegram:roomSelected");

    if (roomSelectedlocalStorage) {
      return JSON.parse(roomSelectedlocalStorage)
    }

    return {} as Rooms
  })

  useEffect(() => {
    api.get(`/rooms`).then(result => {
      setRooms(result.data)
    })
  }, [])

  useEffect(() => {
    api.get(`/messages/${roomSelected.id}`).then(result => {
      setMessages(result.data)
    })

    const channel = socket.subscribe("room"+roomSelected.id);

    setChanelName(channel)
  }, [socket, roomSelected.id])

  useEffect(() => {
    if (chanelName){
      chanelName.bind('client-messageRoom',async function(messageReceived: Messages) {
        const {data} = await api.get(`/rooms`)
        setRooms(data)

        setMessages((state) => [...state, messageReceived])
      });
    }
  }, [chanelName])
  
  const leaveChannel = useCallback((chanel_name) => {
    socket.unsubscribe("room"+chanel_name);

    setChanelName(undefined)
  }, [socket]);

  const handleRoomSelected = useCallback((room: Rooms) => {
    localStorage.setItem('Telegram:roomSelected', JSON.stringify(room))
    setRoomSelected(room)
  },[])

  const createRoom = useCallback((room: Rooms) => {
    setRooms(state => [...state, room])
  },[])

  return (
    <AuthContext.Provider
      value={{
        socket,
        leaveChannel,
        createRoom,
        handleRoomSelected,
        messages,
        roomSelected,
        rooms
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
