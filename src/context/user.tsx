"use client";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";

import { SafeUser } from "@/types/user";

import {login as loginAction} from "@/actions/login"
import LocalStorageKit from "@/utils/localStorageKit";

type OnComplete = (response?: any) => void;
type OnError = (error?: any) => void;

// default state
type UserContextState = {
  token: string | null;
  user: SafeUser | null;
  actions: {
    login: (
      email: string,
      password: string,
      onComplete: OnComplete,
      onError: OnError
    ) => Promise<void>;
    logout: () => void;
  };
};

const defaultState: UserContextState = {
  token: null,
  user: null,
  actions: {
    login: () => Promise.resolve(),
    logout: () => {},
  },
};

// context initator constructor
const UserContext = createContext<Partial<UserContextState>>(defaultState);

// provider
function UserProvider({children}: PropsWithChildren) {
  const [token, setToken] = useState<typeof defaultState.token>(
    defaultState.token
  );
  const [user, setUser] = useState<typeof defaultState.user>(defaultState.user);

  useEffect(() => {
    if(!token) {
        let _token = LocalStorageKit.get("@library/token")
        if(_token) {
            setToken(_token)
            return
        }
    }
  },[])

  const login: typeof defaultState.actions.login = async (
    email,
    password,
    onComplete,
    onError
  ) => {
    try {
        const token = await loginAction(email, password)
        setToken(token)
        LocalStorageKit.set("@library/token", token)
    } catch(error: any) {
        console.warn("Error logging in", error.message)
        onError()
    }
  };

  const logout = () => {};
  return (
    <UserContext.Provider
      value={{
        token,
        user,
        actions: {
          login,
          logout,
        },
      }}
    >
        {children}
    </UserContext.Provider>
  );
}

// use hook
function useUser() {
  const user = useContext(UserContext);
  if (!user) {
    throw new Error("'useUser' used outside of provider");
  }
  return user as UserContextState;
}

export { UserProvider, useUser };
