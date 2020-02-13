import React, {useState} from 'react';
import {useMutation} from "@apollo/react-hooks";
import {deleteTournamentPlayer} from "../../../graphql/TournamentPlayer.graphql";
import _ from "lodash";
import {getPlayers} from "../../../graphql/Players.graphql";
import {GET_TOURNAMENT, GET_TOURNAMENTS} from "../../../graphql/Tournament";
import {GET_SCORES_SESSION} from "../../../graphql/Score";
import {GET_TOURNAMENTPLAYERS} from "../../../graphql/TournamentPlayer";
import {useHistory, useParams} from "react-router-dom";
import {Button} from "muicss/react";
import {Delete} from "@material-ui/icons";

interface IDeleteTournamentPlayer {
  tournamentPlayer: any;
  tournament: any;
  disabled?: boolean;
  size?:string;
  className?: string;
}

const DELETE_TOURNAMENT_PLAYER = deleteTournamentPlayer;

const DeleteTournamentPlayer = ({tournamentPlayer, tournament, disabled= false, size, className}: IDeleteTournamentPlayer) => {
  const history = useHistory();
  const tournamentId = tournament.id;

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
        history.push(`/tournaments/${tournamentId}/players`);
      },
      refetchQueries: [{query: getPlayers}, {query: GET_TOURNAMENT, variables: {tournamentId: tournament.id}}, {
        query: GET_TOURNAMENTPLAYERS,
        variables: {tournamentId}
      }]
    });
  const removePlayerFromTournament = () => delTournamentPlayer({variables: {tournamentPlayerId: tournamentPlayer.id}});
  const {player} = tournamentPlayer;
  return <div className={className}>
     <Button size={size} color={"danger"} onClick={() => removePlayerFromTournament()} disabled={disabled}>
       {/*<Delete/>*/}
       Delete
       {/*Remove {player?.name} from {tournament?.name}*/}
     </Button>
  </div>
};

export default DeleteTournamentPlayer;