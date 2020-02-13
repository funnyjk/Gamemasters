import React from 'react';
import {useMutation} from "@apollo/react-hooks";
import {DELETE_SESSION, DELETE_SESSION_VARS, GET_TOURNAMENT_SESSIONS} from "../../../graphql/Session";
import {useHistory, useParams, useRouteMatch} from "react-router-dom";
import MutationButton from "../../MutationButton";

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
      history.push(`/tournaments/${tournamentId}`);
    },
    refetchQueries: [{query: GET_TOURNAMENT_SESSIONS, variables: {tournamentId}}]
  };

  return <MutationButton mutation={DELETE_SESSION} options={options} text={"Delete Session"} disabled={disabled} color={"danger"}/>
};

export default DeleteSession;