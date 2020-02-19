import React from 'react';
import {createContext, useReducer} from "react";
import reducer from "./reducer";

export interface IAuthContext {
  isAuthenticated: boolean;
}

const initState: IAuthContext = {
  isAuthenticated: !!localStorage.getItem('token')
};

const AuthContext = createContext<any>(initState);

const AuthContextProvider = (props: any) => {
  // [A]
  let [state, dispatch] = useReducer(reducer, initState);
  let value = {state, dispatch};

  // [B]
  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
}

const AuthContextConsumer = AuthContext.Consumer;

export {AuthContext, AuthContextConsumer, AuthContextProvider};