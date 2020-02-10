import React, {useEffect, useState} from 'react';
import {useMutation} from "@apollo/react-hooks";
import {CREATE_SCORE, CREATE_SCORE_VARS} from "../../../graphql/Score";
import { useParams } from 'react-router-dom';
import _ from "lodash";
import {GET_SESSION, GET_TOURNAMENT_SESSIONS} from "../../../graphql/Session";

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

  return <div>
    <select onChange={({target}: any) => setPlayerId(target.value)} value={playerId}>
      <option disabled={true} value={""}>Select Player</option>
      {playersNotInTournSession?.map((tournamentPlayer: any, key: any) => {
        const {player} = tournamentPlayer;
        return <option value={tournamentPlayer.id} key={player.id}>{player.name}</option>
      })}
    </select>
    <button disabled={!playerId} onClick={()=>addNewScore()}>Add New Player to Session</button>
  </div>
};

export default CreateScore;