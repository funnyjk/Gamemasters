import React from 'react';
import {useMutation} from "@apollo/react-hooks";

interface IMutationButton {
  mutation: any;
  options: any;
  text: string;
}

const MutationButton = ({mutation, options, text}: IMutationButton) => {
  const [doMutation] = useMutation(mutation, options);
  return <button onClick={()=> doMutation()}>{text}</button>
};

export default MutationButton;