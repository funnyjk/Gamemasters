import {SET_PAGE} from "./actions";

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case SET_PAGE:
      return {
        ...state,
        page: action.payload
      };
    default:
      return state
  }
};

export default reducer;