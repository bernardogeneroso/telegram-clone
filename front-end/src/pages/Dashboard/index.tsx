import React, {useState, useCallback} from "react";

import {Sockets} from "../../hooks/Sockets";

import Leftpanel from './Leftpanel'
import Rightpanel from './Rightpanel'

import {Rooms} from './Leftpanel'

import { Container } from "./styles";

const Dashboard = () => {
  const [openDrawer, setOpenDrawer] = useState<boolean>(true as boolean);
  const [drawerWidth, setDrawerWidth] = useState(400 as number)
  const [roomSelected, setRoomSelected] = useState<Rooms>({} as Rooms)

  const handleToggleDrawerOpen = useCallback(() => {
    setOpenDrawer(value => {
      if (value) {
        setDrawerWidth(0)
        return !value
      } else {
        setDrawerWidth(400)
        return !value
      }
    })
  }, [setOpenDrawer])

  const handleRoomSelected = useCallback((room: Rooms) => {
    setRoomSelected(room)
  },[]
)

  return (
    <Sockets>
      <Container>
        <Leftpanel 
          openDrawer={openDrawer} 
          drawerWidth={drawerWidth}
          roomSelected={roomSelected}
          handleToggleDrawerOpen={handleToggleDrawerOpen}
          handleRoomSelected={handleRoomSelected}
        />
        
        <Rightpanel 
          openDrawer={openDrawer}
          roomSelected={roomSelected}
          handleToggleDrawerOpen={handleToggleDrawerOpen} 
        />
      </Container>
    </Sockets>
  );
};

export default Dashboard;
