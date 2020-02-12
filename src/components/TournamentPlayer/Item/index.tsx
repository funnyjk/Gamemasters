import React from 'react';
import { useParams } from 'react-router-dom';
import {useQuery} from "@apollo/react-hooks";
import {GET_TOURNAMENTPLAYER, GET_TOURNAMENTPLAYER_VARS} from "../../../graphql/TournamentPlayer";

interface ITournamentPlayerItem {

}

const TournamentPlayerItem = ({}: ITournamentPlayerItem) => {
  const {tournamentPlayerId} = useParams();
  const {loading, data} = useQuery<any, GET_TOURNAMENTPLAYER_VARS>(GET_TOURNAMENTPLAYER, {
    variables: {
      tournamentPlayerId
    }
  });

  if(loading) return <div>Loading</div>;
  if(!data) return <div>No TournamentPlayer</div>;
  const {tournamentPlayer} = data;
  const {player, scores} = tournamentPlayer
  return <div>
    TournamentPlayerItem
    <div>{player.name}</div>
    {scores?.map((score: any, k:number) => {
      return <div key={k}>
        <div>{score.score}</div>
        <div>Session: {score.session.name}</div>
      </div>;
    })}
  </div>
};

export default TournamentPlayerItem;