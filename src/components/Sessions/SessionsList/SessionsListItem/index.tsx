import React from 'react';
import {Link, useRouteMatch} from "react-router-dom";
import ScoresList from "../../../Score/ScoresList";

interface ISessionsListItem {
  session: any;
}

const SessionsListItem = ({session}: ISessionsListItem) => {
  const match = useRouteMatch();

  if(!session) return <div>No Session</div>;
  return <div>
    <h3>
      <Link to={{
        pathname: `${match.url}/${session.id}`
      }}>{session.name}</Link>
    </h3>
    {session.game?.name}
    {/*<ScoresList scores={session.scores}/>*/}
  </div>
};

export default SessionsListItem;