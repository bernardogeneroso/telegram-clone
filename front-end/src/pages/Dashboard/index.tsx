import React, {useState, useCallback} from "react";

import {Sockets} from "../../hooks/Sockets";

import Leftpanel from './Leftpanel'
import Rightpanel from './Rightpanel'

import { Container } from "./styles";

const Dashboard = () => {
  const [openDrawer, setOpenDrawer] = useState<boolean>(true as boolean);
  const [drawerWidth, setDrawerWidth] = useState(400 as number)

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

  return (
    <Sockets>
      <Container>
        <Leftpanel openDrawer={openDrawer} drawerWidth={drawerWidth} handleToggleDrawerOpen={handleToggleDrawerOpen} />
        
        <Rightpanel openDrawer={openDrawer} handleToggleDrawerOpen={handleToggleDrawerOpen} />
      </Container>
    </Sockets>
  );
};

export default Dashboard;
