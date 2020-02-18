import React from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
  Link, NavLink, Redirect
} from "react-router-dom";

import Login from "../Login";
import Signup from "../Signup";

interface IUser {

}

const User = ({}: IUser) => {
  return <Router>
    <Link to={'/login'}>Login</Link>
    <Link to={'/register'}>Signup</Link>
    <Route path={'/login'}><Login/></Route>
    <Route path={'/register'}><Signup/></Route>
  </Router>
};

export default User;