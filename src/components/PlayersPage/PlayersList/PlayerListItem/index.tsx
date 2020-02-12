import React from 'react';
import {Panel} from 'muicss/react';
import {Link, useRouteMatch} from "react-router-dom";

interface IPlayerListItem {
  player: any;
}

const PlayerListItem = ({player}: IPlayerListItem) => {
  const match = useRouteMatch();
  return <Panel>
    <table className={"nav__table"}>
      <tbody >
      <tr>
        <td>
          {player.name}
        </td>
      </tr>
      </tbody>
    </table>
  </Panel>
};

export default PlayerListItem;