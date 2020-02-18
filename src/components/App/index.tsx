import React, {useContext, useEffect, useReducer, useState} from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
  Link, NavLink, Redirect, BrowserRouter
} from "react-router-dom";
// import logo from './logo.svg';
import './App.scss';

import 'muicss/lib/sass/mui';

import HomePage from "../HomePage";
import GamesPage from "../GamesPage";
import TournamentsPage from "../TournamentsPage";
import PlayersPage from "../PlayersPage";
import Scores from "../Score";

import {Button, Container, Appbar} from 'muicss/react';
import AppTabs from "../AppTabs";

import Context from '../../context/pageContext/context';
import reducer from '../../context/pageContext/reducer';
import Login from "../../pages/Login";
import {useToken} from "../../hooks/useAuthentication";
import User from "../../pages/User";
import PrivateRoute from "../PrivateRoute";

export const userPage = '/';

const App = () => {
  const pageInitState = useContext(Context);
  const [state, dispatch] = useReducer(reducer, pageInitState);
  useToken();

  return (
    <Context.Provider value={{state, dispatch}}>
      <BrowserRouter>
        <Switch>

        <Route path={userPage} exact component={User}/>
        <Route  path={'/user'}>



      <Router>
      <div className="app--container">
        <AppTabs/>
        <Container fluid={true} className={"app--grid"}>
        <Switch>
          <PrivateRoute exact path="/" >
              <HomePage/>
          </PrivateRoute>
          <Route path="/players">
            <PlayersPage/>
          </Route>
          <Route path="/tournaments">
            <TournamentsPage/>
          </Route>
          <Route path="/games">
            <GamesPage/>
          </Route>
        </Switch>
        </Container>
    </div>
    </Router>
        </Route>
        </Switch>

      </BrowserRouter>
  </Context.Provider>
  );
}

export default App;
