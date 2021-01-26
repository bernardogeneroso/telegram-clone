import React, {useState, useCallback, useRef} from "react";

import { useSockets } from "../../hooks/Sockets";

import Leftpanel from './Leftpanel'
import Rightpanel from './Rightpanel'
import Righpanelnotselected from './Righpanelnotselected'

import { Container } from "./styles";

const Dashboard = () => {
  const {roomSelected} = useSockets()

  const [openDrawer, setOpenDrawer] = useState<boolean>(true as boolean);
  const [drawerWidth, setDrawerWidth] = useState(400 as number)

  const refInputSearch = useRef<HTMLInputElement>(null)

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
    <Container>
      <Leftpanel
        openDrawer={openDrawer} 
        drawerWidth={drawerWidth}
        handleToggleDrawerOpen={handleToggleDrawerOpen}
        refInputSearch={refInputSearch}
      />
      
      {
        Object.keys(roomSelected).length !== 0 ? (
          <Rightpanel 
            openDrawer={openDrawer}
            handleToggleDrawerOpen={handleToggleDrawerOpen}
            refInputSearch={refInputSearch}
          />
        ) : (
          <Righpanelnotselected />
        )
      }
    </Container>
  );
};

export default Dashboard;
