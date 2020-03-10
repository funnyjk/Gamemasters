import React, {useState} from 'react';
import {IconButton, Input, InputAdornment, TextField} from "@material-ui/core";
import {Add} from "@material-ui/icons";

interface ICreateField {
  createFunction: any;
  toggle: any;
  returnValue: any;
}

const CreateField = ({createFunction, toggle, returnValue}: ICreateField) => {
  const [value, setValue] = useState("");
  const [createNew] = createFunction(value);

  const onClick = () => {
    createNew();
    toggle(false);
  };
  return <Input
    id="standard-adornment-password"
    value={value}
    onChange={({target}) => setValue(target.value)}
    endAdornment={
      <InputAdornment position="end" onClick={onClick}>
        <Add/>
      </InputAdornment>
    }
  />
};

export default CreateField;