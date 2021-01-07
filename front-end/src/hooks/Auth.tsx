import React, { createContext, useCallback, useState, useContext } from "react";

import api from "../services/api";

import userDefault from '../assets/userDefault.png'

interface User {
  id: string;
  fullname: string;
  email: string;
  image: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  secret_password: string;
}

interface AuthContextData {
  data: AuthState;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  updateAvatar(image: string): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem("Telegram:token");
    const user = localStorage.getItem("Telegram:user");

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, secret_password }) => {
    const response = await api.post("/users/sessions", {
      email,
      secret_password,
    });

    const { user, token } = response.data;

    if (user.image === null) {
      user.image = userDefault
    }

    localStorage.setItem("Telegram:token", token);
    localStorage.setItem("Telegram:user", JSON.stringify(user));

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem("Telegram:token");
    localStorage.removeItem("Telegram:user");

    setData({} as AuthState);
  }, []);

  const updateAvatar = useCallback(
    (image: string) => {
      const {user, token} = data

      user.image = image

      setData({
        token,
        user
      });

      localStorage.setItem("Telegram:user", JSON.stringify(user));
    },
    [setData, data]
  );

  return (
    <AuthContext.Provider
      value={{ data, signIn, signOut, updateAvatar }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

export { AuthProvider, useAuth };
