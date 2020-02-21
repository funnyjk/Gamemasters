import React from 'react';
import {DELETE_SCORE, GET_SCORES_SESSION} from "../../../graphql/Score";
import {useHistory, useParams} from "react-router-dom";
import {DELETE_SESSION, GET_SESSION, GET_TOURNAMENT_SESSIONS} from "../../../graphql/Session";
import MutationButton from "../../MutationButton";
import {GET_TOURNAMENT_SCORES} from "../../../graphql/Tournament";
import {Delete} from "@material-ui/icons";
import {ConfirmChildAction} from "../../Confirm";

interface IDeleteScore {
  scoreId: string;
  disabled?: boolean;
}

const DeleteScore = ({scoreId, disabled = false}: IDeleteScore) => {
  const history = useHistory();
  const params: any = useParams();
  const {tournamentId, sessionId} = params;

  const options = {
    update(cache: any, {data: {deleteScore}}: any) {
      history.push(`/tournaments/${tournamentId}/sessions/${sessionId}`);
    },
    refetchQueries: [{
      query: GET_TOURNAMENT_SESSIONS, variables: {tournamentId}},
      {query: GET_SESSION, variables: {sessionId}},
      {query: GET_TOURNAMENT_SCORES, variables: {tournamentId}}
    ],
    variables: { scoreId }
  };

  return <React.Fragment>{!disabled && <ConfirmChildAction initState={false} label={<Delete/>}>
    <MutationButton disabled={disabled} color={"danger"} mutation={DELETE_SCORE} options={options} text={"confirm"}/>
  </ConfirmChildAction>}
  </React.Fragment>;
};

export default DeleteScore;