import React from 'react';
import TournamentPlayer from "../../../TournamentPlayer";
import CreateTournamentPlayer from "../../../TournamentPlayer/createTournamentPlayer";
import {useQuery} from "@apollo/react-hooks";
import _ from "lodash";
import {getPlayersName} from "../../../../graphql/Players.graphql";
import {Link, useRouteMatch} from "react-router-dom";
import SessionsListItem from "../../../Sessions/SessionsList/SessionsListItem";
import {Panel} from "muicss/react";

interface ITournamentComp {
  tournament: any;
  tournamentNumber: number;
}

const TournamentListItem = ({tournament, tournamentNumber}: ITournamentComp) => {
  const match = useRouteMatch();
  const {loading, error, data} = useQuery(getPlayersName);
  const players_in_tournament = _.flatMap(tournament.players).map(({player}: any) => {
    return player;
  });

  const players_not_in_tournament = _.differenceBy(data?.players, players_in_tournament, 'id');

  return <Panel>
    {/*<div className={"tournament-list--list-item"}>*/}
    {/*<Link to={`/tournaments/${tournament.id}`}>{tournament.name}</Link>*/}
    {/*<div className={"tournament-list--list-item--tournament-players"}>*/}
    {/*  {tournament?.players.map((tournamentPlayer: any) => {*/}
    {/*  return <div key={tournamentPlayer.id} className={"tournament-list--list-item--tournament-players--item"}>*/}
    {/*    /!*<img className={"tournament-list--profile-pic"} src={tournamentPlayer.player.pic}/>*!/*/}
    {/*    <div className={"tournament-list--tournament-player"}>*/}
    {/*        <TournamentPlayer value={tournamentPlayer} tournamentNumber={tournamentNumber}/>*/}
    {/*    </div>*/}
    {/*  </div>*/}
    {/*})}*/}

    {/*  {tournament?.sessions.map((session: any, k: number) => {*/}
    {/*    return <div key={k}>*/}
    {/*      <Link to={`${match.url}/${tournament.id}/${session.id}`}>{session.name}</Link>*/}
    {/*    </div>*/}
    {/*  })}*/}
    {/*  </div>*/}

    <table className={"nav__table"}>
      <tbody>
      <tr>
        <td>
          {tournament.name}
        </td>
      </tr>
      </tbody>
    </table>
  </Panel>

  // </div>
};

export default React.memo(TournamentListItem);