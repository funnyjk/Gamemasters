import React from 'react';
import AppTabs from "../AppTabs";
import {Container} from "muicss/react";
import {Redirect, Route, Switch} from "react-router-dom";
import HomePage from "../HomePage";
import PlayersPage from "../PlayersPage";
import TournamentsPage from "../TournamentsPage";
import GamesPage from "../GamesPage";
import Profile from "../Profile";

interface IMainApp {

}

const MainApp = ({}: IMainApp) => {
  return <div className="app--container">
    <Route exact path="/" render={() => <Redirect to="/home"/>}/>

    <AppTabs/>
    <Container fluid={true} className={"app--grid"}>
      <Switch>
        <Route path={'/home'}>
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
        <Route path='/profile'>
          <Profile/>
        </Route>
      </Switch>
    </Container>

  </div>
};

export default MainApp;