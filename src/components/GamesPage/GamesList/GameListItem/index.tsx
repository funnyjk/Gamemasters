import React from 'react';
import {Game} from "../../../../../server/database/generated/prisma";

interface IGameListItem {
  game: Game
}

const GameListItem = ({game}: IGameListItem) => {
  const {name} = game;
  return <div>
    {name}
  </div>;
};

export default GameListItem;