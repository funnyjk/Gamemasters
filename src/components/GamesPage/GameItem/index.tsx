import React from 'react';
import {useHistory, useParams} from "react-router-dom";
import {useMutation, useQuery} from "@apollo/react-hooks";
import {DELETE_GAME, GET_GAME, GET_GAMES, UPDATE_GAME} from "../../../graphql/Game";
import {Game} from "../../../../server/database/generated/prisma";
import _ from "lodash";

const GameItem = () => {
  let history = useHistory();
  const {gameId} = useParams();
  const {loading, error, data} = useQuery(GET_GAME, {variables: {gameId}});

  const [updateGame] = useMutation(UPDATE_GAME);
  const [deleteGame] = useMutation(DELETE_GAME, {
    update(cache, {data: {deleteGame}}) {
      const {games} = cache.readQuery({query: GET_GAMES});
      cache.writeQuery({
        query: GET_GAMES,
        data: {games: _.remove(games, ({id}: Game) => id != deleteGame.id)}
      });
      history.push('/games');
    },
    variables: {gameId}
  });
  const setGame = ({target}: any) => {
    const {name, value} = target;
    updateGame({variables:{
        gameData: {[name]: value},
        gameId: gameId
      }})
  }

  const game = data?.game;
  return <div>
    <pre>{JSON.stringify(data, null, 2)}</pre>
    <input name={"name"} defaultValue={game?.name} onBlur={setGame}/>
    <button onClick={()=>deleteGame({variables:{gameId}})}>Delete</button>
  </div>;
};

export default GameItem;