import {createContext} from "react";

export interface IAuthContext {
  isAuthenticated: boolean
  dispatch: VoidFunction;
}

const initState: IAuthContext = {
  isAuthenticated: !!localStorage.getItem('token'),
  dispatch: ()=>{}
};

interface ICreateContext {
  // ...initState
  dispatch: (action: any) => void;
}

const context = {
  state: initState,
  // dispatch: ()=>{}
};

const Context = createContext<any>(initState);

export default Context;