import React from 'react';
import {useMutation} from "@apollo/react-hooks";
import {Button} from "muicss/react";

interface IMutationButton {
  mutation: any;
  options: any;
  text: string;
  disabled?: boolean;
  color?:string;
  variant?: string;
}

const MutationButton = ({mutation, options, text, disabled= false, color="primary", variant = ""}: IMutationButton) => {
  const [doMutation] = useMutation(mutation, options);
  return <Button variant={variant} color={color} onClick={()=> doMutation()} disabled={disabled}>{text}</Button>
};

export default MutationButton;