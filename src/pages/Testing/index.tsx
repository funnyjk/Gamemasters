import React from 'react';
import { Route, useParams } from 'react-router-dom';
import SessionItem from "../../components/Sessions/Item";
import { useQuery } from "@apollo/react-hooks";
import { GET_TOURNAMENT, GET_TOURNAMENT_OUT, GET_TOURNAMENT_VARS } from "../../graphql/Tournament";
import _ from "lodash";

interface ITesting {

}

const Testing = ({}: ITesting) => {
  const {id} = useParams();
  const {loading, data, error} = useQuery<GET_TOURNAMENT_OUT, GET_TOURNAMENT_VARS>(GET_TOURNAMENT, {variables: {tournamentId: id}});
  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;
  if (loading) return <div>Loading</div>;
  if (!data) return <div>No Data</div>;
  const {tournament} = data;
  const {sessions} = tournament;
  const gameSessions = _.groupBy(sessions, (session) => session.game.name);

  return <div>
    {Object.entries(gameSessions).map(([game, sessions], index) => {
      return <div>
        <h3>{game}</h3>
        {sessions.map(({id}) => {
          return <div><SessionItem key={index} id={id}/></div>
        })}
      </div>
    })}
  </div>
};

export default Testing;