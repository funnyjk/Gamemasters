export const SET_PAGE = "SET_PAGE";
export const TOGGLE_EDIT = "TOGGLE_EDIT";
export const SET_EDIT = "SET_EDIT";

export const setPage = (payload: string) => {
  return {
    type: SET_PAGE,
    payload
  }
};

export const setEdit = (payload: boolean) => {
  return {
    type: SET_EDIT,
    payload
  }
};

export const toggleEdit = () => {
  return {
    type: TOGGLE_EDIT
  }
};