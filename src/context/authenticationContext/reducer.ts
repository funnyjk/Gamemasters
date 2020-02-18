import {LOGIN, SIGN_OUT} from "./actions";
import {IAuthContext} from "./context";

const reducer = (state: IAuthContext, action: any): IAuthContext => {
  switch (action.type) {
    case LOGIN:
      localStorage.setItem('token', action.payload);
      return {
        ...state,
        isAuthenticated: true
      };
    case SIGN_OUT:
      localStorage.removeItem('token');
      return {
        ...state,
        isAuthenticated: false
      };
    default:
      return state
  }
};

export default reducer;