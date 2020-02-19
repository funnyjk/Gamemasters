import {LOGIN, SIGN_OUT} from "./actions";
import {IAuthContext} from "./context";
import {client} from "../../services/apollo";

const reducer = (state: IAuthContext, action: any): IAuthContext => {
  switch (action.type) {
    case LOGIN:
      localStorage.setItem('token', action.payload);
      console.log("TEST")
      return {
        ...state,
        isAuthenticated: true
      };
    case SIGN_OUT:
      localStorage.removeItem('token');
      client.cache.reset();
      return {
        ...state,
        isAuthenticated: false
      };
    default:
      return state
  }
};

export default reducer;