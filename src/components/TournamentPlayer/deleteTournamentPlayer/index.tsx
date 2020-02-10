import React, {useState} from 'react';
import {useMutation} from "@apollo/react-hooks";
import {deleteTournamentPlayer} from "../../../graphql/TournamentPlayer.graphql";
import _ from "lodash";
import {getPlayers} from "../../../graphql/Players.graphql";
import {GET_TOURNAMENTS} from "../../../graphql/Tournament";

interface IDeleteTournamentPlayer {
  tournamentPlayer: any;
  tournament: any;
}

const DELETE_TOURNAMENT_PLAYER = deleteTournamentPlayer;

const DeleteTournamentPlayer = ({tournamentPlayer, tournament}: IDeleteTournamentPlayer) => {
  const [delTournamentPlayer, createTournamentPlayerData] = useMutation(DELETE_TOURNAMENT_PLAYER,
    {
      update(cache, {data: {deleteTournamentPlayer}}) {
        const {tournaments} = cache.readQuery({query: GET_TOURNAMENTS});
        const ret = tournaments.slice(0);
        const tournamentNumber = _.findIndex(tournaments,tournament);
        ret[tournamentNumber] = {
          ...tournaments[tournamentNumber],
          players: _.remove(tournaments[tournamentNumber].players, (tournamentPlayer: any) => tournamentPlayer.id != deleteTournamentPlayer.id)
       };
        const data = {tournaments: ret};

        cache.writeQuery({
          query: GET_TOURNAMENTS,
          data
        });
      },
      refetchQueries: [{query: getPlayers}]
    });
  const removePlayerFromTournament = () => delTournamentPlayer({variables: {tournamentPlayerId: tournamentPlayer.id}});
  const {player} = tournamentPlayer;
  return <div>
     <button onClick={() => removePlayerFromTournament()}>Remove {player?.name} from {tournament?.name}</button>
  </div>
};

export default DeleteTournamentPlayer;