import React from 'react';
import {Button} from "muicss/react";
import { useHistory, useRouteMatch } from 'react-router-dom';

interface ITournamentPlayerListItem {
  tournamentPlayer: any;
}

const TournamentPlayerListItem = ({tournamentPlayer}: ITournamentPlayerListItem) => {
  const history = useHistory();
  const match = useRouteMatch();
  const {player} = tournamentPlayer;
  return <div>
    <Button variant={"raised"} onClick={()=>history.push(`${match.url}/${tournamentPlayer.id}`)}>{player.name}</Button>
      {/*<Button onClick={() => history.push(`/players/${player.id}`)}>*/}
      {/*  {player.name}*/}
      {/*</Button>*/}
    </div>
};

export default TournamentPlayerListItem;