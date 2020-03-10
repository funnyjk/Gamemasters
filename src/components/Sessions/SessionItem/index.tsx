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
import {useToggleIsEdit} from "../../../hooks/useToggleIsEdit";
import UpdateSession from "../UpdateSession";
import {Form} from "muicss/react";
import GamesSelect from "../../GamesPage/GamesSelect";

interface ISessionItem {
  tournament: any;
}

const SessionItem = ({tournament}: ISessionItem) => {
  const [isEdit] = useToggleIsEdit();
  const {sessionId} = useParams();
  // const [scores, setScores] = useState([]);
  const {loading, error, data} = useQuery<any, GET_SESSION_VARS>(GET_SESSION, {variables: {sessionId}});
  const [updateSession] = useMutation(UPDATE_SESSION, {
    refetchQueries: [
      {query: GET_SESSION, variables:{sessionId}},
      {query: GET_TOURNAMENT_SESSIONS, variables:{tournamentId: tournament.id}}
      ]
  });
  // const scoreQuery = useQuery(GET_SCORES_SESSION, {variables: {sessionId}});

  // useEffect(() => {
  //   if(scoreQuery.data) {
  //     setScores(scoreQuery.data.scores);
  //   }
  // }, [scoreQuery.data]);

  const updateOptions = {
    variables: {
      sessionId
    }
  };
  const [gameId, setGameId] = useState();
  const selectedGameId = (id: string) => {
    updateSession({variables: {
      sessionId,
      sessionData: {
        game: {connect: {id}}
      }
    }})
    // setGameId(target.value);
  };

  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;
  if (loading) return <div>Loading</div>;
  if(!data) return <div>No Data</div>;
  const {session} = data;
  const {scores} = session;

  const props  = {
    tabIndex: -1
  }

  return <div>
    <div>
      <UpdateSession sessionId={sessionId} defaultValue={session.name} name={"name"} disabled={!isEdit} label={"Session Name"}/>
    {isEdit && <DeleteSession disabled={!isEdit}/>}
    </div>
    {!isEdit? <h5>{session?.game.name}</h5> : <GamesSelect value={session.game.id} onChange={selectedGameId}/>}
    {scores && <Scores scores={scores} tournament={tournament} session={session}/> }
  </div>
};

export default React.memo(SessionItem);