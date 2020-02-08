import React from 'react';
import {Link, useHistory, useRouteMatch} from "react-router-dom";
import {useMutation, useQuery} from "@apollo/react-hooks";
import {CREATE_GAME, GET_GAMES} from "../../../graphql/Game";
import {Game} from "../../../../server/database/generated/prisma";
import GameListItem from "./GameListItem";

const GamesList = () => {
  const match = useRouteMatch();
  let history = useHistory();

  const [createGame] = useMutation(CREATE_GAME, {
    update(cache, {data: {createGame}}) {
      cache.writeQuery({
        query: GET_GAMES,
        data: {games: games.concat([createGame])}
      });
      history.push(`/games/${createGame.id}`);
    },
    variables:{gameName: "NewGame"}
  });
  const {loading, error, data} = useQuery(GET_GAMES);
  const games = data?.games;
  return <div>
    <button onClick={()=>createGame()}>Add Game</button>
    <h4>GamesList</h4>
    {games?.map((game: Game, k: any) => {
      return <div key={k}>
        <Link to={`${match.path}/${game.id}`}>
        <GameListItem game={game}/>
      </Link>
      </div>
    })}
  </div>;
};
export default GamesList;