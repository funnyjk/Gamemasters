import React from 'react';
import DeleteTournamentPlayer from "./deleteTournamentPlayer";
import {useHistory} from "react-router-dom";

interface ITournamentPlayer {
  value: any;
  tournamentNumber?: number;
}

const TournamentPlayer = ({value, tournamentNumber}: ITournamentPlayer) => {
  const history = useHistory();
  const {player} = value;
  return <div>
    <button onClick={()=>history.push(`/players/${player.id}`)}>
      {player.name}
    </button>
  </div>
};

export default TournamentPlayer;