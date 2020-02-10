import React from "react";
import {Link, Route, Switch, useRouteMatch, useParams} from "react-router-dom";
import SessionsList from "./SessionsList";
import SessionItem from "./SessionItem";
import {Tournament} from "../../../server/database/generated/prisma";
import CreateSession from "./CreateSession";
import SessionSwitch from "./SessionSwitch";

interface ISessions {
  tournament: Tournament;
}

const Sessions = ({tournament}: ISessions) => {
  const match = useRouteMatch();
  const params = useParams();
  return <React.Fragment>

    <div className={"component--nav"}>
    </div>

    <Switch>
      {/*<Route path={`${match.path}/:sessionId`}>*/}
      {/*  <div className={"component--item"}>*/}
      {/*    <Link to={`${match.url}`}>Sessions</Link>*/}
      {/*    <SessionItem tournament={tournament}/>*/}
      {/*  </div>*/}
      {/*</Route>*/}
      {/*<Route path={`${match.path}/sessions`}>*/}
      {/*  <div className={"component--item"}>*/}
      {/*    <Link to={`${match.url}`}>Sessions</Link>*/}
      {/*    <SessionItem tournament={tournament}/>*/}
      {/*  </div>*/}
      {/*</Route>*/}
      {/*<Route path={match.path}>*/}
      {/*  <CreateSession tournament={tournament}/>*/}
      {/*  <SessionsList tournament={tournament}/>*/}
      {/*</Route>      */}


      <Route path={`${match.path}`}>
        <SessionSwitch tournament={tournament}/>
      </Route>


    </Switch>
  </React.Fragment>;
}

export default Sessions;