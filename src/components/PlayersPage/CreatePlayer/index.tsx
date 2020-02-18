import React from 'react';
import {Button} from "muicss/react";
import {useMutation} from "@apollo/react-hooks";
import {CREATE_PLAYER, CREATE_PLAYER_VARS} from "../../../graphql/Players";
import {GET_PLAYERS} from "../PlayersList";
import {GET_TOURNAMENTS} from "../../../graphql/Tournament";
import {useHistory} from "react-router-dom";
import {Add} from "@material-ui/icons";

export const useCreatePlayer = (playerName: string) => {
  const history = useHistory();
  const [createPlayer] = useMutation<any, CREATE_PLAYER_VARS>(CREATE_PLAYER,
    {
      variables: {
        playerName
      },
      update(cache, {data: {createPlayer}}) {
        const {players} = cache.readQuery({query: GET_PLAYERS});
        cache.writeQuery({
          query: GET_PLAYERS,
          data: {players: players.concat([createPlayer])},
        });
        history.push(`/players/${createPlayer.id}`)
      },
      refetchQueries: [{query: GET_TOURNAMENTS}]
    });

  return createPlayer;
};

interface ICreatePlayer {

}

const CreatePlayer = ({}: ICreatePlayer) => {

  return <Button variant="fab" onClick={() => useCreatePlayer("NewPlayerName")}>
    <Add/>
  </Button>

};



export default CreatePlayer;