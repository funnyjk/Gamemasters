import React from 'react';
import TournamentPlayerListItem from "../ListItem";

interface ITournamentPlayerList {
  tournamentPlayers: any;
}

const TournamentPlayerList = ({tournamentPlayers}: ITournamentPlayerList) => {
  return <div>
    {tournamentPlayers.map((tournamentPlayer: any, k: number) => {
      return <TournamentPlayerListItem key={k} tournamentPlayer={tournamentPlayer}/>
    })}
  </div>
};

export default TournamentPlayerList;