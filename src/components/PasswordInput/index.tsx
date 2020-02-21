import React, {useState} from 'react';
import {FilledInput, FormControl, IconButton, InputAdornment, InputLabel} from "@material-ui/core";

import {Visibility, VisibilityOff} from "@material-ui/icons";

interface IPasswordInput {
  password: string;
  setPassword: any;
  autoComplete?: 'current-password' | 'new-password' | 'none';
  id: string;
  label: string;
}

const PasswordInput = ({password, setPassword, autoComplete = "none", label, id}: IPasswordInput) => {
  const [viewPassword, setViewPassword] = useState(false);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  return <FormControl variant="filled">
    <InputLabel htmlFor="standard-adornment-password">{label}</InputLabel>
    <FilledInput id={id}
                 autoComplete={autoComplete}
                 type={viewPassword ? 'text' : 'password'}
                 value={password} onChange={e => setPassword(e.target.value)}
                 endAdornment={
                   <InputAdornment position="end" tabIndex={-1}>
                     <IconButton
                       tabIndex={-1}
                       aria-label="toggle password visibility"
                       onClick={()=>setViewPassword(!viewPassword)}
                       onMouseDown={handleMouseDownPassword}
                     >
                       {viewPassword ? <Visibility/> : <VisibilityOff/>}
                     </IconButton>
                   </InputAdornment>}
    />
  </FormControl>
};

export default PasswordInput;