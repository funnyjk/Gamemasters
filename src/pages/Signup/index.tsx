import React, {Dispatch, useEffect, useState} from "react";
import {Button, FilledInput, FormControl, IconButton, InputAdornment, InputLabel, TextField} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import {useMutation} from "@apollo/react-hooks";
import {SIGNUP, SIGNUP_RETURN, SIGNUP_VARS} from "../authentication";
import {Alert} from "@material-ui/lab";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import {useToggle} from "../../hooks/useToggle";

interface ISignup {
  usernameState: [string, Dispatch<string>];
  passwordState: [string, Dispatch<string>];
}

const Signup = ({usernameState, passwordState}: ISignup) => {
  const [error, setError] = useState("");
  const AddError = (msg: string) => {
    setError(msg);
  }

  // const [user, setUser] = useUser();
  const history = useHistory();
  const [doLogin] = useMutation<SIGNUP_RETURN, SIGNUP_VARS>(SIGNUP, {
    update(cache, {data: {register: {id, username}}}) {
      // setUser(id);
      setPassword("");
      setConfirmPassword("");
      history.push('/login')
    },
    onError: error => {
      AddError(error.graphQLErrors[0].message);
    }
  })
  const [email, setEmail] = useState("");
  const [username, setUsername] = usernameState;
  const [password, setPassword] = passwordState;
  const [confirmPassword, setConfirmPassword] = useState("");


  const validateForm = () => {
    return !(validatePasswordMatch() && validateFormLength())
  }

  function validatePasswordMatch() {
    return password === confirmPassword;
  }

  function validateFormLength() {
    return (username.length > 0 && password.length > 0 && confirmPassword.length > 0);
  }

  function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    const test = doLogin({
      variables: {
        username,
        password,
        email
      }
    });
    // userHasAuthenticated();
  }

  useEffect((): any => {
    const errorTimer = setTimeout(function () {
      setError("")
    }, 3000);
    return () => clearTimeout(errorTimer);
  }, [error]);

  const [viewPassword, setViewPassword] = useToggle(false);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  return (
    <div className="signup">
      {error && <Alert severity={"error"}>{error}</Alert>}

      <form onSubmit={handleSubmit} className={"user__form"}>
        {/*<FormGroup id="email">*/}
        {/*  <FormControlLabel label={"Email"} control={*/}
        {/*  <Input*/}
        {/*    type="email"*/}
        {/*    value={email}*/}
        {/*    onChange={e => setEmail(e.target.value)}*/}
        {/*  />}/>*/}
        {/*</FormGroup>        */}

        <TextField id="username"
                   autoComplete={"username"}
                   variant="filled" label="Username" value={username}
                   onChange={e => setUsername(e.target.value)}/>
        <TextField id="email"
                   autoComplete={"username"}
                   type={"email"}
                   variant="filled" label="Email" value={email}
                   onChange={e => setEmail(e.target.value)}/>
        <FormControl variant="filled">
          <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
          <FilledInput id="password"
                       autoComplete={"new-password"}
                       type={viewPassword ? 'text' : 'password'}
                       value={password} onChange={e => setPassword(e.target.value)}
                       endAdornment={
                         <InputAdornment position="end" tabIndex={-1}>
                           <IconButton
                             tabIndex={-1}
                             aria-label="toggle password visibility"
                             onClick={setViewPassword}
                             onMouseDown={handleMouseDownPassword}
                           >
                             {viewPassword ? <Visibility/> : <VisibilityOff/>}
                           </IconButton>
                         </InputAdornment>}
          />
        </FormControl>
        <FormControl variant="filled">
          <InputLabel htmlFor="standard-adornment-password">Confirm Password</InputLabel>
          <FilledInput id="confirm-password"
                       autoComplete={"new-password"}
                       type={viewPassword ? 'text' : 'password'}
                       value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}
                       endAdornment={
                         <InputAdornment position="end" tabIndex={-1}>
                           <IconButton
                             tabIndex={-1}
                             aria-label="toggle password visibility"
                             onClick={setViewPassword}
                             onMouseDown={handleMouseDownPassword}
                           >
                             {viewPassword ? <Visibility/> : <VisibilityOff/>}
                           </IconButton>
                         </InputAdornment>}
          />
        </FormControl>
        <Button variant="contained" type="submit" color={"primary"}
                disabled={validateForm()} disableElevation>
          Signup
        </Button>
      </form>
    </div>
  );
};

export default Signup;