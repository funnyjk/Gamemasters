import React from 'react';
import {Link, useHistory, useRouteMatch} from "react-router-dom";
import {useMutation, useQuery} from "@apollo/react-hooks";
import {CREATE_GAME, GET_GAMES} from "../../../graphql/Game";
import {Game} from "../../../../server/database/generated/prisma";
import GameListItem from "./GameListItem";
import { Button } from 'muicss/react';

const GamesList = () => {
  const match = useRouteMatch();
  const {loading, error, data} = useQuery(GET_GAMES);
  const games = data?.games;
  return <React.Fragment>
    {games?.map((game: Game, k: any) => {
      return <div key={k}>
        <Link to={`${match.path}/${game.id}`}>
          <GameListItem game={game}/>
        </Link>
      </div>
    })}
  </React.Fragment>;
};
export default GamesList;