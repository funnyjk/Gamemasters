import React from 'react';
import Scores from "../../Score";
import {useParams, useHistory, useRouteMatch} from "react-router-dom";
import {useMutation, useQuery} from "@apollo/react-hooks";
import {
  DELETE_SESSION,
  DELETE_SESSION_VARS,
  GET_SESSION,
  GET_SESSION_VARS, GET_TOURNAMENT_SESSIONS,
  UPDATE_SESSION,
  UPDATE_SESSION_VARS
} from "../../../graphql/Session";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import {GET_TOURNAMENT} from "../../../graphql/Tournament";
import DeleteSession from "../DeleteSession";

interface ISessionItem {

}

const SessionItem = ({}: ISessionItem) => {
  const history = useHistory();
  const match = useRouteMatch();

  const {sessionId, tournamentId} = useParams();
  console.log(tournamentId)
  const {loading, error, data} = useQuery<any, GET_SESSION_VARS>(GET_SESSION, {variables: {sessionId}});

  const [updateSession] = useMutation<any, UPDATE_SESSION_VARS>(UPDATE_SESSION);
  const [deleteSession] = useMutation<any, DELETE_SESSION_VARS>(DELETE_SESSION, {
    update(cache, {data: {deleteSession}}) {

      console.log(match)
      history.push(`/tournaments/${tournamentId}`);
    },
    refetchQueries: [{query: GET_TOURNAMENT_SESSIONS, variables: {tournamentId}}]
  });

  const changeSession = ({target}: any) => {
    const {name, value} = target;
    updateSession({variables: {
        sessionData: {[name]: value},
        sessionId
      }})
  };

  if (error) return <div>{error}</div>;
  if (loading) return <div>Loading</div>;
  if(!data) return <div>No Data</div>;
  const {session} = data;
  return <div>
    <h3><input name={"name"} defaultValue={session?.name} onBlur={changeSession}/></h3>
    <DeleteSession/>
    <h5>{session?.game.name}</h5>
    <Scores scores={session?.scores}/>
  </div>
};

export default SessionItem;