import React, {useEffect, useState} from 'react';
import {useMutation} from "@apollo/react-hooks";
import {UPDATE_SESSION, UPDATE_SESSION_VARS} from "../../graphql/Session";

interface IMutationInput {
  mutation: any;
  options: any;
  type: string;
  name: string;
  defaultValue: any;
  label?: string;
  optionsData: string;
}

const MutationInput = ({mutation, options, optionsData, type, name, defaultValue, label}: IMutationInput) => {
  const [inputValue, setInputValue] = useState("");
  const [doMutation] = useMutation(mutation, options);
  const onBlur = ({target}: any) => {
    const {name, value} = target;
    doMutation({variables: {
        ...options.variables,
        [optionsData]: {
          [name]: value
        }
      }})
  };

  const changeValue = ({target}: any) => {
    const {value} = target;
    setInputValue(value)
  };

  useEffect(() => {
    setInputValue(defaultValue);
  }, [defaultValue]);

  return <div>
    <input name={name} type={type} value={inputValue} onChange={changeValue} onBlur={onBlur} />
  </div>
};

export default MutationInput;