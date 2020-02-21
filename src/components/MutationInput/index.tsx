import React, {useEffect, useState} from 'react';
import {useMutation} from "@apollo/react-hooks";
import {TextField} from "@material-ui/core";

interface IMutationInput {
  mutation: any;
  options: any;
  type: string;
  name: string;
  defaultValue: any;
  label?: string;
  optionsData: string;
  disabled?: boolean
  auto?: boolean;
  mult?: boolean;
}

const MutationInput = ({mutation, options, auto=false, optionsData, type, name, defaultValue, label, disabled = false, mult = false}: IMutationInput) => {
  const [inputValue, setInputValue] = useState(defaultValue);
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

  if(disabled) return <span>{inputValue}</span>;
  return <TextField autoFocus={auto} label={label} name={name} type={type} value={inputValue} onChange={changeValue} onBlur={onBlur} disabled={disabled}
                    multiline={mult}/>
};

export default React.memo(MutationInput);