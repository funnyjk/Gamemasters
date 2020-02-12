export const SET_PAGE = "SET_PAGE";

export const setPage = (payload: string) => {
  return {
    type: SET_PAGE,
    payload
  }
};