import React, {useEffect} from 'react';
import {Route, Switch, useHistory, useRouteMatch, useParams} from "react-router-dom";
import TournamentPlayerItem from "./Item";
import TournamentPlayerList from "./List";
import {useQuery} from "@apollo/react-hooks";
import {GET_TOURNAMENTPLAYERS, GET_TOURNAMENTPLAYERS_VARS} from "../../graphql/TournamentPlayer";
import CreateTournamentPlayer from "./createTournamentPlayer";

interface ITournamentPlayer {
  // value: any;
  // tournamentNumber?: number;
  tournamentId: string;
}

const TournamentPlayer = ({tournamentId}: ITournamentPlayer) => {
  const match = useRouteMatch();
  // const {tournamentId} = useParams();
  const list_class = false ? "component__list" : "component__list--sidebar";
  
  const {error, loading, data} = useQuery<any, GET_TOURNAMENTPLAYERS_VARS>(GET_TOURNAMENTPLAYERS, {variables: {
      tournamentId
    }});
  if(loading) return <div>Loading</div>;
  if (error) return <div>{`Error! ${error.message}`}</div>;
  if(!data) return <div>No Tournament Players</div>;
  const {tournamentPlayers} = data;

  return <React.Fragment>
    <div className={`${list_class}`}>
      <TournamentPlayerList tournamentPlayers={tournamentPlayers}/>
    </div>

    <Switch>
      <Route path={`${match.path}/:tournamentPlayerId`}>
        <div className={"component__item"}>
          <TournamentPlayerItem/>
        </div>
      </Route>
      {/*<Route path={`${match.path}`}>*/}
      {/*  */}
      {/*</Route>*/}
    </Switch>
  </React.Fragment>;
};

export default TournamentPlayer;