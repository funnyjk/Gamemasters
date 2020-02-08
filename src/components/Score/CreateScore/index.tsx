import React, {useEffect, useState} from 'react';
import {useMutation, useQuery} from "@apollo/react-hooks";
import {CREATE_SCORE, CREATE_SCORE_VARS} from "../../../graphql/Score";
import { useParams } from 'react-router-dom';
import {GET_TOURNAMENT, GET_TOURNAMENT_VARS} from "../../../graphql/Tournament";
import _ from "lodash";
import {GET_SESSION, GET_SESSION_VARS, GET_TOURNAMENT_SESSIONS} from "../../../graphql/Session";

interface ICreateScore {

}

const CreateScore = ({}: ICreateScore) => {
  const {sessionId, tournamentId} = useParams();

  const [createScore] = useMutation<any, CREATE_SCORE_VARS>(CREATE_SCORE);
  const tournamentData = useQuery<any, GET_TOURNAMENT_VARS>(GET_TOURNAMENT, {variables: {tournamentId}});
  const sessionData = useQuery<any, GET_SESSION_VARS>(GET_SESSION, {variables: {sessionId}});

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
  };

  if(!tournamentData.data) return <div>No Tournament</div>;
  if(!sessionData.data) return <div>No Session</div>;
  const {tournament} = tournamentData.data;
  const {session} = sessionData.data;

  const players_in_tournament = _.flatMap(tournament?.players).map(({player}: any) => {
    return player;
  });

  const players_in_session = _.flatMap(session.scores).map(({player}: any) => {
    return player;
  });

  const players_in_tournament_not_in_session = _.differenceBy(players_in_tournament, players_in_session,'id');

  // useEffect(()=> {
  //   if(players_in_tournament_not_in_session.length == 0) {
  //     setPlayerId("")
  //   }
  // },[players_in_tournament_not_in_session]);

  return <div>
    <pre>{JSON.stringify(sessionId, null, 2)}</pre>
    <select onChange={({target}: any) => setPlayerId(target.value)} value={playerId}>
      <option disabled={true} value={""}>Select Player</option>
      {players_in_tournament_not_in_session?.map((playerFromList: any, key: any) => {
        return <option value={playerFromList.id} key={playerFromList.id}>{playerFromList.name}</option>
      })}
    </select>
    <button disabled={!playerId} onClick={()=>addNewScore()}>Add New Player to Session</button>
  </div>
};

export default CreateScore;