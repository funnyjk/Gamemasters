import React from 'react';
import {useHistory, useParams} from "react-router-dom";
import {useMutation, useQuery} from "@apollo/react-hooks";
import {DELETE_GAME, GET_GAME, GET_GAMES, UPDATE_GAME} from "../../../graphql/Game";
import {Game} from "../../../../server/database/generated/prisma";
import _ from "lodash";
import MutationInput from "../../MutationInput";
import {FormControlLabel, FormGroup, Switch as ToggleSwitch} from "@material-ui/core";
import {useToggleIsEdit} from "../../../hooks/useToggleIsEdit";
import {Button} from "muicss/react";

const GameItem = () => {
  const [isEdit, toggleEdit] = useToggleIsEdit();

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
  return <div className={"item_page"}>
    <div className={"item_page__controls"}>
      <FormGroup className={"item_page__controls__item--right"}>
        <FormControlLabel label={"Edit"} control={
          <ToggleSwitch checked={isEdit} onChange={toggleEdit}/>
        }/>
      </FormGroup>
    </div>
    <h3>{!isEdit? <span>{game.name}</span>: <MutationInput mutation={UPDATE_GAME} options={updateOptions} type={"text"} name={"name"} defaultValue={game.name} optionsData={"gameData"}/>}</h3>
    {isEdit && <Button color={"danger"} onClick={()=>deleteGame({variables:{gameId}})}>Delete</Button> }
  </div>;
};

export default GameItem;