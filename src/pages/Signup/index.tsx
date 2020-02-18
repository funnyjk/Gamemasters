import React, {useState} from "react";
import {Button, FormGroup, FormControlLabel, Input} from "@material-ui/core";
import {useAuthentication, useSetAuthentication, useToken, useUser} from "../../hooks/useAuthentication";
import {useHistory} from "react-router-dom";
import {useMutation} from "@apollo/react-hooks";
import {SIGNUP, SIGNUP_RETURN, SIGNUP_VARS} from "../authentication";

export default function Signup(props: any) {
  const [user, setUser] = useUser();
  const history = useHistory();
  const [doLogin] = useMutation<SIGNUP_RETURN, SIGNUP_VARS>(SIGNUP, {
    update(cache, {data: {register: {id, username}}}) {
      setUser(id);
      history.push('/login')
    }
  })
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  function validatePasswordMatch() {
    return password === confirmPassword;
    // return email.length > 0 && password.length > 0;
  }

  function validateFormLength() {
    return username.length > 0 && password.length > 0 && confirmPassword.length > 0;
  }

  function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    const test = doLogin({
      variables: {
        username,
        password
      }
    });
    // userHasAuthenticated();
  }

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        {/*<FormGroup id="email">*/}
        {/*  <FormControlLabel label={"Email"} control={*/}
        {/*  <Input*/}
        {/*    type="email"*/}
        {/*    value={email}*/}
        {/*    onChange={e => setEmail(e.target.value)}*/}
        {/*  />}/>*/}
        {/*</FormGroup>        */}

        <FormGroup id="username">
          <FormControlLabel label={"Username"} control={
            <Input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />}/>
        </FormGroup>

        <FormGroup id="password">
          <FormControlLabel label={"Password"} control={
            <Input
              value={password}
              onChange={e => setPassword(e.target.value)}
              type="password"
            />
          }/>
        </FormGroup>
        <FormGroup id="password">
          <FormControlLabel label={"Password"} control={
            <Input
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              type="password"
            />
          }/>
        </FormGroup>
        <Button disabled={!validatePasswordMatch() && validateFormLength()} type="submit">
          Signup
        </Button>
      </form>
    </div>
  );
}