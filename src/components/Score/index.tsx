import React, {useEffect} from "react";
import {Route, Switch, useRouteMatch, useParams, Link} from "react-router-dom";
import ScoresList from "./ScoresList";
import ScoreItem from "./ScoreItem";
import CreateScore from "./CreateScore";

interface IScores {
  scores?: any;
}

const Scores = ({scores}: IScores) => {
  const match = useRouteMatch();
  return <React.Fragment>

    <div className={"component--nav"}>
    </div>
    <CreateScore/>

    <Switch>
      <Route path={`${match.path}/:scoreId`}>
        <div className={"component--item"}>
          <Link to={`${match.url}`}>Back</Link>
          <ScoreItem/>
        </div>
      </Route>
      <Route path={match.url}>
        <ScoresList scores={scores}/>
      </Route>
    </Switch>
  </React.Fragment>;
}

export default Scores;