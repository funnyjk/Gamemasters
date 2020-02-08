import React from 'react';
import {useMutation} from "@apollo/react-hooks";
import {DELETE_SCORE, DELETE_SCORE_VARS} from "../../../graphql/Score";
import {useHistory, useParams, useRouteMatch} from "react-router-dom";
import {GET_SESSION, GET_TOURNAMENT_SESSIONS} from "../../../graphql/Session";

interface IDeleteScore {

}

const DeleteScore = ({}: IDeleteScore) => {
  const history = useHistory();
  const params: any = useParams();
  const {scoreId, tournamentId, sessionId} = params;

  const [deleteScore] = useMutation<any, DELETE_SCORE_VARS>(DELETE_SCORE, {
    update(cache, {data: {deleteScore}}) {
      history.push(`/tournaments/${tournamentId}/${sessionId}`);
    },
    refetchQueries: [{
      query: GET_TOURNAMENT_SESSIONS, variables: {tournamentId}}, {
      query: GET_SESSION, variables: {sessionId}}
    ]
  });

  const removeScore = () => {
    deleteScore({
      variables: {
        scoreId
      },
    });
  };

  return <button onClick={() => removeScore()}>Delete Score</button>;
};

export default DeleteScore;