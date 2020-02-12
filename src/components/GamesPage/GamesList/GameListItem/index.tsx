import React from 'react';
import {Game} from "../../../../../server/database/generated/prisma";
import {Panel} from "muicss/react";
import {Link, useRouteMatch} from "react-router-dom";

interface IGameListItem {
  game: Game
}

const GameListItem = ({game}: IGameListItem) => {
  const match = useRouteMatch();

  const {name, id} = game;
  return <Panel>
    <table className={"nav__table"}>
      <tbody>
      <tr>
        <td>
          {name}
        </td>
      </tr>
      </tbody>
    </table>
  </Panel>
};

export default GameListItem;