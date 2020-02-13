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

    <div className={"component__list--sidebar"}>
      <SessionsList tournament={tournament}/>
    </div>

    <Switch>
      <Route path={`${match.path}/:sessionId`}>
        <div className={"component__item"}>
          {/*<Link to={`${match.url}`}>Add Session</Link>*/}
          <SessionItem tournament={tournament}/>
        </div>
      </Route>
    </Switch>
  </React.Fragment>
}

export default Sessions;