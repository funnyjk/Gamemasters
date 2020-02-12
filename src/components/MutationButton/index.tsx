import React from 'react';
import {useMutation} from "@apollo/react-hooks";

interface IMutationButton {
  mutation: any;
  options: any;
  text: string;
  disabled?: boolean;
}

const MutationButton = ({mutation, options, text, disabled= false}: IMutationButton) => {
  const [doMutation] = useMutation(mutation, options);
  return <button onClick={()=> doMutation()} disabled={disabled}>{text}</button>
};

export default MutationButton;