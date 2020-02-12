import React, {useEffect, useState} from 'react';
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
import {GET_SCORES_SESSION} from "../../../graphql/Score";

interface ISessionItem {
  tournament: any;
}

const SessionItem = ({tournament}: ISessionItem) => {
  const history = useHistory();
  const location = useLocation();
  const match = useRouteMatch();

  const {sessionId, tournamentId} = useParams();
  // console.log(tournamentId)
  const [scores, setScores] = useState([]);
  const {loading, error, data} = useQuery<any, GET_SESSION_VARS>(GET_SESSION, {variables: {sessionId}});
  const scoreQuery = useQuery(GET_SCORES_SESSION, {variables: {sessionId}});

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
  useEffect(() => {
    if(scoreQuery.data) {
      setScores(scoreQuery.data.scores);
    }
  }, [scoreQuery.data]);

  const updateOptions = {
    variables: {
      sessionId
    }
  };

  if (error) return <div>{error}</div>;
  if (loading) return <div>Loading</div>;
  if(!data) return <div>No Data</div>;
  const {session} = data;

  // if(!scoreQuery?.data) return <div>no scores</div>
  // scoreQuery?.data;

  return <div>
    <MutationInput mutation={UPDATE_SESSION} options={updateOptions} type={"text"} name={"name"} defaultValue={session.name} optionsData={"sessionData"}/>
    <DeleteSession/>
    <h5>{session?.game.name}</h5>
    <Scores scores={scores} tournament={tournament} session={session}/>
  </div>
};

export default SessionItem;