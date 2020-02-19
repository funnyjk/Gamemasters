import React, {useContext, useEffect} from 'react';
import {Add} from '@material-ui/icons'

import {Button} from "muicss/react";
import useCreateButton from "./useCreateButton";
import Context from "../../context/pageContext/context";
import { useLocation, useParams } from 'react-router-dom';
import {useSetIsEdit, useToggleIsEdit} from "../../hooks/useToggleIsEdit";

interface ICreateButton {

}

const CreateButton = ({}: ICreateButton) => {
  const params: any =  useParams();
  const setEdit = useSetIsEdit();

  const onClick = useCreateButton(params?.id);
  if(!onClick) return null;
  return <Button variant={"fab"} onClick={() => {
    setEdit(true);
    onClick()
  }}>
    <Add/>
  </Button>;
};

export default CreateButton;