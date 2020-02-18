import React from 'react';
import {useSubscription} from "@apollo/react-hooks";
import {GET_GAMES, SUBSCRIBE_DELETE_GAME, SUBSCRIBE_NEW_GAME, SUBSCRIBE_UPDATED_GAME} from "../../../graphql/Game";
import {client} from "../../../services/apollo";
import _ from "lodash";

interface IGameSubscription {

}

const useGameSubscription = () => {
  const user = localStorage.getItem("user");
  console.log(user)
  const {error, loading, data} = useSubscription(SUBSCRIBE_NEW_GAME, {
    variables: {
      ownerId: user
    },
    onSubscriptionData({subscriptionData}) {
      const {games} = client.readQuery({query: GET_GAMES});
      const newGames = games.concat([subscriptionData.data.game.node]);
      client.writeQuery({
        query: GET_GAMES,
        data: {
          games: newGames
        }
      })
    }
  });

  const deleteGame = useSubscription(SUBSCRIBE_DELETE_GAME, {
    onSubscriptionData({subscriptionData}) {
      const deletedGame = subscriptionData.data.game.previousValues;

      const {games} = client.readQuery({query: GET_GAMES});
      var index = _.findIndex(games, {id: deletedGame.id});
      const removed = [...games.slice(0, index), ...games.slice(index + 1)];
      client.writeQuery({
        query: GET_GAMES,
        data: {
          games: removed
        }
      })
    }
  });

  const updateGame = useSubscription(SUBSCRIBE_UPDATED_GAME, {
    onSubscriptionData({subscriptionData}) {
      const updatedGame = subscriptionData.data.game.node;

      const {games} = client.readQuery({query: GET_GAMES});
      var index = _.findIndex(games, {id: updatedGame.id});
      const removed = [...games.slice(0, index), ...games.slice(index +1)];
      const newGames = removed.concat([updatedGame])
      client.writeQuery({
        query: GET_GAMES,
        data: {
          games: newGames
      }})
    }
  });
};

export default useGameSubscription;