import React from 'react';
import TournamentsList from "./TournamentsList";
import {Route, Switch, useRouteMatch} from "react-router-dom";
import TournamentItem from "./TournamentItem";
import {useMutation} from "@apollo/react-hooks";
import {CREATE_TOURNAMENT, CREATE_TOURNAMENT_VARS, GET_TOURNAMENTS} from "../../graphql/Tournament";

const TournamentsPage = () => {
  const match = useRouteMatch();

  const [createTournament] = useMutation<any, CREATE_TOURNAMENT_VARS>(CREATE_TOURNAMENT, {
      update(cache, {data: {createTournament}}) {
        const {tournaments} = cache.readQuery({query: GET_TOURNAMENTS});
        cache.writeQuery({
          query: GET_TOURNAMENTS,
          data: {
            tournaments: tournaments.concat([createTournament])
          }
        })
      },
      variables: {tournamentName: "New Tournament"}
    }
  );
  return <React.Fragment>
    <div className={"component--nav"}>
      <button onClick={() => createTournament()}>Add Tournament</button>
    </div>

    <div className={"component--list tournament--list"}>
      <TournamentsList/>
    </div>
    <Switch>
      <Route path={`${match.path}/:tournamentId`}>
        <div className={"component--item tournament--item"}>
          <TournamentItem/>
        </div>
      </Route>
      <Route path={match.path}>
      </Route>
    </Switch>
  </React.Fragment>;
};

export default TournamentsPage;