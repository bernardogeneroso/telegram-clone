import React from "react";

import {Sockets} from "../../hooks/Sockets";

import Leftpanel from './Leftpanel'
import Rightpanel from './Rightpanel'

import { Container } from "./styles";

const Dashboard = () => {
  return (
    <Sockets>
      <Container>
        <Leftpanel />
        
        <Rightpanel />
      </Container>
    </Sockets>
  );
};

export default Dashboard;
