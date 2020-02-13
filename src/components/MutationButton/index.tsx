import React from 'react';
import {useMutation} from "@apollo/react-hooks";
import {Button} from "muicss/react";

interface IMutationButton {
  mutation: any;
  options: any;
  text: any;
  disabled?: boolean;
  color?:string;
  variant?: string;
}

const MutationButton = ({mutation, options, text, disabled= false, color="primary", variant = ""}: IMutationButton) => {
  const [doMutation, {loading: mutationLoading, error: mutationError}] = useMutation(mutation, options);

  return <React.Fragment>
    <Button variant={variant} color={color} onClick={()=> doMutation()} disabled={disabled}>{text}</Button>
    {mutationLoading && <p>Loading...</p>}
    {mutationError && <p>Error :( Please try again</p>}
  </React.Fragment>
};

export default MutationButton;