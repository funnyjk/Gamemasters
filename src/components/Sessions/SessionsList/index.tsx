import React from 'react';
import {useQuery} from "@apollo/react-hooks";
import {GET_TOURNAMENT_SESSIONS, GET_TOURNAMENT_SESSIONS_VARS} from "../../../graphql/Session";
import {Tournament} from "../../../../server/database/generated/prisma";
import {useParams} from "react-router-dom";
import SessionsListItem from "./SessionsListItem";

interface ISessionsList {
  tournament: Tournament;
}

const SessionsList = ({tournament}: ISessionsList) => {
  const {tournamentId} = useParams();

  const {data} = useQuery<any, GET_TOURNAMENT_SESSIONS_VARS>(GET_TOURNAMENT_SESSIONS, {
    variables: {
      tournamentId: tournamentId
    }
  })

  const sessions = data?.sessions;
  return <div>
    SessionsList
    {sessions?.map((session: any, k: number) => {
      return <div key={k}>
        <SessionsListItem session={session}/>
      </div>
    })}
  </div>
};

export default SessionsList;