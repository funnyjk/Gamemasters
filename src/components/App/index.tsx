import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link, NavLink
} from "react-router-dom";
// import logo from './logo.svg';
import './App.scss';
import HomePage from "../HomePage";
import GamesPage from "../GamesPage";
import TournamentsPage from "../TournamentsPage";
import PlayersPage from "../PlayersPage";
import Scores from "../Score";

const App = () => {
  return (
    <Router>
      <div className="app--container">
        <nav className={"app--nav"}>
          <li>
            <NavLink exact={true} to={'/'}>Home</NavLink>
          </li>
          <li>
            <NavLink to={'/players'}>Players</NavLink>
          </li>
          <li>
            <NavLink to={'/tournaments'}>Tournaments</NavLink>
          </li>
          <li>
            <NavLink to={'/games'}>Games</NavLink>
          </li>
        </nav>
        <div className={"app--grid"}>
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
        </div>
    </div>
    </Router>
  );
}

export default App;
