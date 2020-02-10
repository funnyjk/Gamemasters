import React from 'react';
import Scores from "../../Score";
import {useParams, useHistory, useRouteMatch, useLocation} from "react-router-dom";
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
import MutationInput from "../../MutationInput";

interface ISessionItem {
  tournament: any;
  session: any;
}

const SessionItem = ({tournament, session}: ISessionItem) => {
  const history = useHistory();
  const location = useLocation();
  const match = useRouteMatch();

  const {sessionId, tournamentId} = useParams();
  // console.log(tournamentId)
  // const {loading, error, data} = useQuery<any, GET_SESSION_VARS>(GET_SESSION, {variables: {sessionId}, fetchPolicy: 'no-cache'});

  // const [updateSession] = useMutation<any, UPDATE_SESSION_VARS>(UPDATE_SESSION);
  // const [deleteSession] = useMutation<any, DELETE_SESSION_VARS>(DELETE_SESSION, {
  //   update(cache, {data: {deleteSession}}) {
  //     history.push(`/tournaments/${tournamentId}`);
  //   },
  //   refetchQueries: [{query: GET_TOURNAMENT_SESSIONS, variables: {tournamentId}}]
  // });

  // const changeSession = ({target}: any) => {
  //   const {name, value} = target;
  //   updateSession({variables: {
  //       sessionData: {[name]: value},
  //       sessionId
  //     }})
  // };

  const updateOptions = {
    variables: {
      sessionId
    }
  };

  // if (error) return <div>{error}</div>;
  // if (loading) return <div>Loading</div>;
  // if(!data) return <div>No Data</div>;
  // const {session} = data;
  // const {session}: any = location.state;

  return <div>
    <pre>{JSON.stringify(session, null, 2)}</pre>
    <pre>{JSON.stringify(location, null, 2)}</pre>
    <MutationInput mutation={UPDATE_SESSION} options={updateOptions} type={"text"} name={"name"} defaultValue={session.name} optionsData={"sessionData"}/>
    <DeleteSession/>
    <h5>{session?.game.name}</h5>
    <Scores scores={session?.scores} tournament={tournament} session={session}/>
  </div>
};

export default SessionItem;