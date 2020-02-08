import React from 'react';
import {useMutation} from "@apollo/react-hooks";
import {DELETE_SESSION, DELETE_SESSION_VARS, GET_TOURNAMENT_SESSIONS} from "../../../graphql/Session";
import {useHistory, useParams, useRouteMatch} from "react-router-dom";

interface IDeleteSession {

}

const DeleteSession = ({}: IDeleteSession) => {
  const history = useHistory();
  const {sessionId, tournamentId} = useParams();

  const [deleteSession] = useMutation<any, DELETE_SESSION_VARS>(DELETE_SESSION, {
    update(cache, {data: {deleteSession}}) {
      history.push(`/tournaments/${tournamentId}`);
    },
    refetchQueries: [{query: GET_TOURNAMENT_SESSIONS, variables: {tournamentId}}]
  });

  const removeSession = () => {
    deleteSession({
      variables: {
        sessionId
      },
    });
  };

  return <button onClick={() => removeSession()}>Delete Session</button>;
};

export default DeleteSession;