import React from 'react';
import {useMutation} from "@apollo/react-hooks";
import {DELETE_SESSION, DELETE_SESSION_VARS, GET_TOURNAMENT_SESSIONS} from "../../../graphql/Session";
import {useHistory, useParams, useRouteMatch} from "react-router-dom";
import MutationButton from "../../MutationButton";
import {ConfirmChildAction} from "../../Confirm";
import {DELETE_TOURNAMENT} from "../../../graphql/Tournament";

interface IDeleteSession {
  disabled?: boolean;
}

const DeleteSession = ({disabled = false}: IDeleteSession) => {
  const history = useHistory();
  const {sessionId, tournamentId} = useParams();

  const options = {
    variables: {
      sessionId
    },
    update() {
      history.push(`/tournaments/${tournamentId}/sessions`);
    },
    refetchQueries: [{query: GET_TOURNAMENT_SESSIONS, variables: {tournamentId}}]
  };
  return <ConfirmChildAction initState={false} label={"Delete"}>
    <MutationButton mutation={DELETE_SESSION} options={options} text={"Delete Session"} disabled={disabled}
                    color={"danger"}/>
  </ConfirmChildAction>
};

export default DeleteSession;