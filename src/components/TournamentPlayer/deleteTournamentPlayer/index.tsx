import React, {useState} from 'react';
import {useMutation} from "@apollo/react-hooks";
import {deleteTournamentPlayer} from "../../../graphql/TournamentPlayer.graphql";
import _ from "lodash";
import {getPlayers} from "../../../graphql/Players.graphql";
import {GET_TOURNAMENT, GET_TOURNAMENTS} from "../../../graphql/Tournament";
import {GET_SCORES_SESSION} from "../../../graphql/Score";

interface IDeleteTournamentPlayer {
  tournamentPlayer: any;
  tournament: any;
  disabled?: boolean;
}

const DELETE_TOURNAMENT_PLAYER = deleteTournamentPlayer;

const DeleteTournamentPlayer = ({tournamentPlayer, tournament, disabled= false}: IDeleteTournamentPlayer) => {
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
      refetchQueries: [{query: getPlayers}, {query: GET_TOURNAMENT, variables: {tournamentId: tournament.id}}]
    });
  const removePlayerFromTournament = () => delTournamentPlayer({variables: {tournamentPlayerId: tournamentPlayer.id}});
  const {player} = tournamentPlayer;
  return <div>
     <button onClick={() => removePlayerFromTournament()} disabled={disabled}>Remove {player?.name} from {tournament?.name}</button>
  </div>
};

export default DeleteTournamentPlayer;