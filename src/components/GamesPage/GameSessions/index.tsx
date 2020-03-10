import React from 'react';
import { useQuery } from "@apollo/react-hooks";
import { SESSION_BY_GAME, SESSION_BY_GAME_OUT, SESSION_BY_GAME_VARS } from "../../../graphql/Session";
import _ from "lodash";
import SessionItem from "../../Sessions/Item";
import { Link } from "react-router-dom";

interface IGameSessions {
  gameId: string;
}

const GameSessions = ({gameId}: IGameSessions) => {
  const {loading, error, data} = useQuery<SESSION_BY_GAME_OUT, SESSION_BY_GAME_VARS>(SESSION_BY_GAME, {
    variables: {
      gameId
    }
  });
  
  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;
  if (loading) return <div>Loading</div>;
  if (!data) return <div>No Data</div>;
  const {sessions} = data;
  const tournamentSessions = _.groupBy(sessions, (session) => session.tournament.name);

  return <div>
    {Object.entries(tournamentSessions).map(([tournament, sessions], index) => {
      return <div key={index}>
        <h3>{tournament}</h3>
        <div className={"scoreboard"}>
        {sessions.map(({id}, _ind) => {
          return <SessionItem key={_ind} id={id}/>
        })}
        </div>
      </div>
    })}
  </div>
};

export default GameSessions;