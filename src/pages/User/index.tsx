import React, {useState} from 'react';
import logo from  '../../logo.png';
import {
  HashRouter as Router,
  Switch,
  Route,
  Link, NavLink, Redirect
} from "react-router-dom";

import Login from "../Login";
import Signup from "../Signup";
import {Container} from "muicss/react";
import './styles';
import ResetPassword from "../ResetPassword";
import ForgotPassword from "../ForgotPassword";

interface IUser {

}

const User = ({}: IUser) => {
  const usernameState = useState("");
  const passwordState = useState("");

  return <Container fluid={true}>
    <div>
    <img src={logo}/>
    </div>
    <Route exact path="/" render={() => <Redirect to="/login"/>}/>
    <NavLink className={"mui-btn mui-btn--primary"} to={'/login'}>Login</NavLink>
    <NavLink className={"mui-btn mui-btn--primary"} to={'/register'}>Signup</NavLink>
    <Route path={'/login'}><Login/></Route>
    <Route exact path={'/register'}><Signup/></Route>
    <Route path={'/forgot-password'}>
      <ForgotPassword/>
    </Route>
    <Route exact path={'/reset/:id/:token'}>
        <ResetPassword/>
    </Route>
  </Container>
};

export default User;