import React from 'react';
import {Link, useRouteMatch} from "react-router-dom";
import ScoresList from "../../../Score/ScoresList";

interface ISessionsListItem {
  session: any;
}

const SessionsListItem = ({session}: ISessionsListItem) => {
  const match = useRouteMatch();
  return <div>
    <h3>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <Link to={`${match.url}/${session.id}`}>{session.name}</Link>
    </h3>
    {session.game.name}
    <ScoresList scores={session.scores}/>
  </div>
};

export default SessionsListItem;