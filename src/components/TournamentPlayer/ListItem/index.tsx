import React from 'react';
import {Button, Panel} from "muicss/react";
import {Link, useHistory, useRouteMatch} from 'react-router-dom';

interface ITournamentPlayerListItem {
  tournamentPlayer: any;
}

const TournamentPlayerListItem = ({tournamentPlayer}: ITournamentPlayerListItem) => {
  const history = useHistory();
  const match = useRouteMatch();
  const {player} = tournamentPlayer;
  return <Panel>
    <Link to={`${match.url}/${tournamentPlayer.id}`}>
      <table className={"nav__table"}>
        <tbody>
        <tr>
          <td>
            {player.name}
          </td>
        </tr>
        </tbody>
      </table>
    </Link>
  </Panel>
};

export default TournamentPlayerListItem;