import {createContext} from "react";

const initState = {
  page: "",
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