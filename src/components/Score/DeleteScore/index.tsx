import React from 'react';
import {DELETE_SCORE, GET_SCORES_SESSION} from "../../../graphql/Score";
import {useHistory, useParams} from "react-router-dom";
import {GET_SESSION, GET_TOURNAMENT_SESSIONS} from "../../../graphql/Session";
import MutationButton from "../../MutationButton";

interface IDeleteScore {

}

const DeleteScore = ({}: IDeleteScore) => {
  const history = useHistory();
  const params: any = useParams();
  const {scoreId, tournamentId, sessionId} = params;

  const options = {
    update(cache: any, {data: {deleteScore}}: any) {
      history.push(`/tournaments/${tournamentId}/${sessionId}`);
    },
    refetchQueries: [{
      query: GET_TOURNAMENT_SESSIONS, variables: {tournamentId}},
      {query: GET_SESSION, variables: {sessionId}},
      {query: GET_SCORES_SESSION, variables: {sessionId}}
      ],
    variables: { scoreId }
  };

  return <MutationButton mutation={DELETE_SCORE} options={options} text={"Delete Score"}/>
};

export default DeleteScore;