import React from 'react';
import {Button} from 'muicss/react';
import {useHistory} from "react-router-dom";
import {useMutation} from "@apollo/react-hooks";
import {CREATE_GAME, CREATE_GAME_VARS, GET_GAMES} from "../../../graphql/Game";
import {Add} from "@material-ui/icons";

interface ICreateGame {

}

export const useCreateGame = (gameName: string) => {
  let history = useHistory();

  const [createGame] = useMutation<any, CREATE_GAME_VARS>(CREATE_GAME, {
    update(cache, {data: {createGame}}) {
      const {games} = cache.readQuery({query: GET_GAMES});
      cache.writeQuery({
        query: GET_GAMES,
        data: {games: games.concat([createGame])}
      });
      history.push(`/games/${createGame.id}`);
    },
    variables: {gameName}
  });

  return createGame;
};

const CreateGame = ({}: ICreateGame) => {
  const createGame = useCreateGame("NewGame");
  return <Button variant={"fab"}  onClick={() => createGame()}>
    <Add/>
  </Button>
};

export default CreateGame;