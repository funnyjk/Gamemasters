import {useCallback, useContext} from "react";
import Context from "../context/pageContext/context";
import {setEdit, toggleEdit} from "../context/pageContext/actions";

export const useToggleIsEdit = (): [boolean, VoidFunction] => {
  const {state, dispatch} = useContext(Context);
  const {isEdit} = state;
  return [isEdit, useCallback(() => {
    return dispatch(toggleEdit())
  }, [])];
};

export const useSetIsEdit = () => {
  const {dispatch} = useContext(Context);
  return useCallback((set: boolean) => {
    return dispatch(setEdit(set))
  }, []);
};