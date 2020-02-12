import React, {useContext, useReducer} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link, NavLink
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

import Context from '../../context/pageContext/context.ts';
import reducer from '../../context/pageContext/reducer.ts';

const App = () => {
  const pageInitState = useContext(Context);
  const [state, dispatch] = useReducer(reducer, pageInitState);

  return (
    <Context.Provider value={{state, dispatch}}>

    <Router>
      <div className="app--container">
          <AppTabs/>
        <Container fluid={true} className={"app--grid"}>
        <Switch>
          <Route exact path="/" >
            <HomePage/>
          </Route>
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
  </Context.Provider>
  );
}

export default App;
