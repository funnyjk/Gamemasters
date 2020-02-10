import React, {useEffect, useState} from "react";
import {Route, Switch, useRouteMatch, useParams, Link} from "react-router-dom";
import ScoresList from "./ScoresList";
import ScoreItem from "./ScoreItem";
import CreateScore from "./CreateScore";
import _ from "lodash";

interface IScores {
  scores?: any;
  tournament: any;
  session: any;
}

const Scores = ({scores, tournament, session}: IScores) => {
  const [playersInTourn, setPlayersInTourn] = useState([]);
  const [playersInSession, setPlayersInSession] = useState([]);
  const match = useRouteMatch();
  useEffect(() => {
    const players_in_tournament = _.flatMap(tournament?.players).map((tournamentPlayer: any) => {
      return tournamentPlayer;
    });

    const players_in_session = _.flatMap(session?.scores).map(({player}: any) => {
      return player;
    });

    setPlayersInTourn(players_in_tournament);
    setPlayersInSession(players_in_session);
  }, [tournament?.players, session?.scores]);


  return <React.Fragment>

    <div className={"component--nav"}>
    </div>
    <CreateScore tournamentPlayers={playersInTourn} sessionPlayers={playersInSession}/>

    <Switch>
      <Route path={`${match.path}/:scoreId`}>
        <div className={"component--item"}>
          <Link to={`${match.url}`}>Back</Link>
          <ScoreItem/>
        </div>
      </Route>
      <Route path={match.path}>
        <ScoresList scores={scores}/>
      </Route>
    </Switch>
  </React.Fragment>;
}

export default Scores;