import React, {useState} from 'react';
import {useMutation} from "@apollo/react-hooks";
import {createTournamentPlayer} from "../../../graphql/TournamentPlayer.graphql";
import {Player} from "../../../../server/database/generated/prisma";
import {getPlayers} from "../../../graphql/Players.graphql";
import {GET_TOURNAMENTS} from "../../../graphql/Tournament";
import _ from "lodash";

interface ICreateTournamentPlayer {
  tournament: any;
  playerList: any;
}

const CREATE_TOURNAMENT_PLAYER = createTournamentPlayer;

const CreateTournamentPlayer = ({tournament, playerList}: ICreateTournamentPlayer) => {
  const [tournamentPlayer, createTournamentPlayerData] = useMutation(CREATE_TOURNAMENT_PLAYER,
    {
      update(cache, {data: {createTournamentPlayer}}) {
        const {tournaments} = cache.readQuery({query: GET_TOURNAMENTS});
        const ret = tournaments.slice(0);
        const tournamentNumber = _.findIndex(tournaments, tournament);

        ret[tournamentNumber] = {
          ...tournament,
          players: tournament.players.concat([createTournamentPlayer])
        };
        const data = {tournaments: ret};
        cache.writeQuery({
          query: GET_TOURNAMENTS,
          data
        });
      },
      refetchQueries: [{query: getPlayers}]
    });
  const addPlayerToTournament = () => tournamentPlayer({variables: {playerId: player.id, tournamentId: tournament.id}});

  const [player, setPlayer] = useState({} as Player);
  const SetPlayerId = ({target}: any) => {
    const {value} = target;
    setPlayer(playerList[value]);
  };
  return <div>
    <select onChange={SetPlayerId} defaultValue={""}>
      <option disabled={true} value={""}>Select Player</option>
      {playerList?.map((playerFromList: any, key: any) => {
        return <option value={key} key={playerFromList.id}>{playerFromList.name}</option>
      })}
    </select>

    <button hidden={!player.id} onClick={()=>addPlayerToTournament()}>Add {player.name} to {tournament?.name}</button>
  </div>
};

export default CreateTournamentPlayer;