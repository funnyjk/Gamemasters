import React, {useEffect, useState} from 'react';
import {useMutation} from "@apollo/react-hooks";
import {CREATE_SCORE, CREATE_SCORE_VARS, GET_SCORES_SESSION} from "../../../graphql/Score";
import { useParams } from 'react-router-dom';
import _ from "lodash";
import {GET_SESSION, GET_TOURNAMENT_SESSIONS} from "../../../graphql/Session";
import {Fab, FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import {Add} from "@material-ui/icons";
import {Button} from "muicss/react";


interface ICreateScore {
  tournamentPlayers: any
  sessionPlayers: any;
}

const CreateScore = ({tournamentPlayers, sessionPlayers}: ICreateScore) => {
  const {sessionId, tournamentId} = useParams();

  const [createScore] = useMutation<any, CREATE_SCORE_VARS>(CREATE_SCORE);

  const [playerId, setPlayerId] = useState("");
  const addNewScore = () => {
    createScore({
      variables: {
        playerId,
        sessionId: sessionId
      },
      refetchQueries: [{
        query: GET_TOURNAMENT_SESSIONS, variables: {tournamentId}}, {
        query: GET_SESSION, variables: {sessionId}
      }]
    })

    setPlayerId("")
  };

  const [playersNotInTournSession, setPlayersNotInTournSession] = useState([]);

  useEffect(() => {
    setPlayersNotInTournSession(_.differenceBy(tournamentPlayers, sessionPlayers, 'id'));
  }, [tournamentPlayers, sessionPlayers]);

  return <div style={{display: "grid"}}>
    <FormControl className={"player_list"}>
      <InputLabel id="select-player-label">Select Player</InputLabel>
    <Select labelId="select-player-label" onChange={({target}: any) => setPlayerId(target.value)} value={playerId}>
      <MenuItem disabled={true} value={""}>Select Player</MenuItem>
      {playersNotInTournSession?.map((tournamentPlayer: any, key: any) => {
        const {player} = tournamentPlayer;
        return <MenuItem value={tournamentPlayer.id} key={player.id}>{player.name}</MenuItem>
      })}
    </Select>
  </FormControl>
    <Button size="small" color={"primary"} disabled={!playerId} onClick={()=>addNewScore()}><Add/></Button>
  </div>
};

export default CreateScore;