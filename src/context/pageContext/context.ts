import {createContext} from "react";

export interface pageContextState {
  page: string;
  isEdit: boolean;
  dispatch: VoidFunction;
}

const initState: pageContextState = {
  page: "",
  isEdit: false,
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