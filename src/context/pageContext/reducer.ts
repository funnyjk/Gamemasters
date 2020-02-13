import {SET_EDIT, SET_PAGE, TOGGLE_EDIT} from "./actions";
import {pageContextState} from "./context";

const reducer = (state: pageContextState, action: any): pageContextState => {
  switch (action.type) {
    case SET_PAGE:
      return {
        ...state,
        page: action.payload
      };
    case SET_EDIT:
      return {
        ...state,
        isEdit: action.payload
      };
    case TOGGLE_EDIT:
      return {
        ...state,
        isEdit: !state.isEdit
      };
    default:
      return state
  }
};

export default reducer;