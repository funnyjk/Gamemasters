import React, {useState} from 'react';
import {useMutation} from "@apollo/react-hooks";
import {Player} from "../../../../server/database/generated/prisma";
import {getPlayers} from "../../../graphql/Players.graphql";
import {GET_TOURNAMENTS} from "../../../graphql/Tournament";
import _ from "lodash";
import {GET_SESSION} from "../../../graphql/Session";
import {CREATE_TOURNAMENTPLAYER, GET_TOURNAMENTPLAYERS} from "../../../graphql/TournamentPlayer";
import {Select, MenuItem, InputLabel, FormControl} from '@material-ui/core';
import './styles';
import {Button} from "muicss/react";
import {useToggleIsEdit} from "../../../hooks/useToggleIsEdit";
import {Add} from "@material-ui/icons";
interface ICreateTournamentPlayer {
  tournament: any;
  playerList: any;
}


const CreateTournamentPlayer = ({tournament, playerList}: ICreateTournamentPlayer) => {
  const [isEdit] = useToggleIsEdit();

  const [tournamentPlayer, createTournamentPlayerData] = useMutation(CREATE_TOURNAMENTPLAYER,
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
      refetchQueries: [{query: getPlayers}, {query: GET_TOURNAMENTS}, {
        query: GET_TOURNAMENTPLAYERS, variables:{
          tournamentId: tournament.id
        }
      }]
    });

  const [player, setPlayer]: any = useState('');

  const addPlayerToTournament = () => {
    tournamentPlayer({variables: {playerId: player.id, tournamentId: tournament.id}});
    setPlayer('')
  }

  const handleChange = ({target}: any) => {
    const {value} = target;
    setPlayer(value);
  };
  return <React.Fragment>
    <FormControl className={"player_list flex-inline"}>
      <InputLabel id="select-player-label">Select Player</InputLabel>

      <Select labelId="select-player-label" onChange={handleChange} value={player}>
        {/*<MenuItem disabled={true} value={""} >Select Player</MenuItem>*/}
        {playerList?.map((playerFromList: any, key: any) => {
          return <MenuItem value={playerFromList} key={key}>{playerFromList.name}</MenuItem>
        }) }
        {!playerList?.length && <MenuItem disabled={true}>No Players</MenuItem>}
    </Select>
      {<Button color="primary" disabled={!player}
               onClick={() => addPlayerToTournament()}>
        <Add/>
      </Button>}

    </FormControl>

  </React.Fragment>
};

export default CreateTournamentPlayer;