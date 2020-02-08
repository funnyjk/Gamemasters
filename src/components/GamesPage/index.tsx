import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import GamesList from "./GamesList";
import GameItem from "./GameItem";


const GamesPage = () => {
  const match = useRouteMatch();
  return <React.Fragment>
    <div className={"games--list"}>
      <GamesList/>
    </div>
    <Switch>
      <Route path={`${match.path}/:gameId`}>
        <div className={"game--item"}>
          <GameItem/>
        </div>
      </Route>
      <Route path={match.path}>
      </Route>
    </Switch>
  </React.Fragment>;
};

export default GamesPage;