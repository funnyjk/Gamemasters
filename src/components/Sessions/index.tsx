import React from "react";
import {Link, Route, Switch, useRouteMatch, useParams} from "react-router-dom";
import SessionsList from "./SessionsList";
import SessionItem from "./SessionItem";
import {Tournament} from "../../../server/database/generated/prisma";
import CreateSession from "./CreateSession";

interface ISessions {
  tournament: Tournament;
}

const Sessions = ({tournament}: ISessions) => {
  const match = useRouteMatch();
  const params = useParams();
  return <React.Fragment>

    <div className={"component--nav"}>
      <pre>{JSON.stringify(params, null, 2)}</pre>
    </div>

    <Switch>
      <Route path={`${match.path}/:sessionId`}>
        <div className={"component--item"}>
          <Link to={`${match.url}`}>Sessions</Link>
          <SessionItem/>
        </div>
      </Route>
      <Route path={match.path}>
        <CreateSession tournament={tournament}/>
        <SessionsList tournament={tournament}/>
      </Route>
    </Switch>
  </React.Fragment>;
}

export default Sessions;