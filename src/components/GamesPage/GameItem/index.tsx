import React from 'react';
import {useHistory, useParams} from "react-router-dom";
import {useMutation, useQuery} from "@apollo/react-hooks";
import {DELETE_GAME, GET_GAME, GET_GAMES, UPDATE_GAME} from "../../../graphql/Game";
import {Game} from "../../../../server/database/generated/prisma";
import _ from "lodash";
import MutationInput from "../../MutationInput";

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
  const updateOptions = {
    variables: {gameId}
  }
  if(!data) return <div>No Game</div>;
  const {game} = data;
  return <div>
    <h3>{game.name}</h3>
    <MutationInput mutation={UPDATE_GAME} options={updateOptions} type={"text"} name={"name"} defaultValue={game.name} optionsData={"gameData"}/>
    <button onClick={()=>deleteGame({variables:{gameId}})}>Delete</button>
  </div>;
};

export default GameItem;