import React, {useState} from "react";
import {Button, FormGroup, FormControlLabel, Input} from "@material-ui/core";
import {useAuthentication, useSetAuthentication, useToken, useUser} from "../../hooks/useAuthentication";
import {useHistory} from "react-router-dom";
import {useMutation} from "@apollo/react-hooks";
import {LOGIN, LOGIN_RETURN, LOGIN_VARS} from "../authentication";

export default function Login(props: any) {
  const [localToken, setLocalToken] = useToken();
  const [user, setUser] = useUser();
  const history = useHistory();
  const [doLogin] = useMutation<LOGIN_RETURN, LOGIN_VARS>(LOGIN, {
    update(cache, {data: {login: {token, user}}}) {
      setLocalToken(token);
      setUser(user.id);
      location.pathname = '/user#/';

    }
  })
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("Test");
  const [password, setPassword] = useState("Test");


  // function validateForm() {
  //   return email.length > 0 && password.length > 0;
  // }

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
        <Button type="submit">
          Login
        </Button>
      </form>
    </div>
  );
}