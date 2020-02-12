import React, {useContext, useEffect} from 'react';
import {Add} from '@material-ui/icons'

import {Button} from "muicss/react";
import useCreateButton from "./useCreateButton";
import Context from "../../context/pageContext/context";

interface ICreateButton {

}

const CreateButton = ({}: ICreateButton) => {
  const {state} = useContext(Context);
  const onClick = useCreateButton(state.page);
  return <Button variant={"fab"} onClick={() => onClick()}>
    <Add/>
  </Button>;
};

export default CreateButton;