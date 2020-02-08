import React from 'react';
import {Link, useRouteMatch, useParams, useLocation} from "react-router-dom";
import './style';

interface IScoresListItem {
  score: any
}

const ScoresListItem = ({score}: IScoresListItem) => {
  let {tournamentId, sessionId} = useParams();
  const location = useLocation();
  

  const match = useRouteMatch();

  return <div className={"score-list--item"}>
    <div className={"score-list--item--score"} >{score.score}</div>
    <div className={"score-list--item--name"} >{score.player.name}</div>
    {/*<Link to={`/tournaments/${tournamentId}/${sessionId}/${score.id}`}>GOTO</Link>*/}
    {((sessionId)? <Link to={`${match.url}/${score.id}`}>GOTO</Link> : "")}
  </div>
};

export default ScoresListItem;