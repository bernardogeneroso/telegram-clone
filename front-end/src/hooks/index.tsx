import React from "react";

import { AuthProvider } from "./Auth";
import {Sockets} from "./Sockets";
import { ToastProvider } from "./Toast";

const AppProvider: React.FC = ({ children }) => (
    <AuthProvider>
      <Sockets>
        <ToastProvider>{children}</ToastProvider>
      </Sockets>
    </AuthProvider>
);

export default AppProvider;
