import {useState, useCallback} from "react";

export const useToggle = (initial: boolean): [boolean, VoidFunction] => {
  const [open, setOpen] = useState(initial);

  return [open, useCallback(() => {
    return setOpen(status => !status)
  }, [])];
};