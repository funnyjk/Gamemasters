import React, {Dispatch, useEffect, useState} from "react";
import {
  Button,
  FilledInput,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField
} from "@material-ui/core";
import {Alert} from '@material-ui/lab';

import {useAuthentication} from "../../hooks/useAuthentication";
import {Link, NavLink, useHistory, useLocation} from "react-router-dom";
import {useMutation} from "@apollo/react-hooks";
import {LOGIN, LOGIN_RETURN, LOGIN_VARS} from "../authentication";
import {useToggle} from "../../hooks/useToggle";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import {Container} from "muicss/react";

interface ILogin {

}

const Login = ({}: ILogin) => {
  const [error, setError] = useState("");
  const AddError = (msg: string) => {
    setError(msg);

  }
  const auth = useAuthentication();
  const history = useHistory();
  const location = useLocation();
  const {from}: any = location.state || {from: {pathname: "/home"}};
  const [doLogin] = useMutation<LOGIN_RETURN, LOGIN_VARS>(LOGIN, {
    update(cache, {data: {login: {token, user}}}) {
      auth.login(token, ()=>{
        history.replace(from);
      });
    },
    onError: error => {
      AddError(error.graphQLErrors[0].message);
    }
  });
  const [email, setEmail] = useState("");
  // const [username, setUsername] = usernameState;
  const [password, setPassword] = useState("");

  useEffect((): any => {
    const errorTimer = setTimeout(function () {
      setError("")
    }, 3000);
    return () => clearTimeout(errorTimer)
  }, [error]);

  // function validateForm() {
  //   return email.length > 0 && password.length > 0;
  // }
  const validateForm = () => {
    return !(validateFormLength())
  }

  function validateFormLength() {
    return (email.length > 0 && password.length > 0);
  }

  function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    const test = doLogin({
      variables: {
        email,
        password
      }
    });
    // userHasAuthenticated();
  }
  const [viewPassword, setViewPassword] = useToggle(false);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  return (
    <div className="Login">
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
        <TextField id="email"
                   autoComplete={"email"}
                   variant="filled" label="Email" value={email} onChange={e => setEmail(e.target.value)}/>
        <FormControl variant="filled">
          <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
          <FilledInput id="password"

                       autoComplete={"current-password"}

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
        <Button variant="contained" type="submit" color={"primary"} disabled={validateForm()} disableElevation>
          Login
        </Button>


      </form>

      {/*<Button onClick={()=> auth.login("Test", () => {*/}
      {/*  history.replace(from);*/}
      {/*})}>*/}
      {/*  Login*/}
      {/*</Button>*/}
      {/*<Button onClick={()=> auth.signout( () => {*/}
      {/*  history.replace(from);*/}
      {/*})}>*/}
      {/*  signout*/}
      {/*</Button>*/}
      <Link className={"mui-btn mui-btn--primary"} to={'/forgot-password'}>Forgot Password</Link>

    </div>
  );
};

export default Login;