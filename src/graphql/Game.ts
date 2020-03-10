import gql from 'graphql-tag';
import {useMutation} from "@apollo/react-hooks";

export const GET_GAMES = gql`
    query {
        games {
            id
            name
        }
    }
`;

export const GET_GAME = gql`
    query getGame($gameId: ID) {
        game(where:{id: $gameId}) {
            id
            name
            notes
        }
    }
`;


export interface CREATE_GAME_VARS {
    gameName: string;
}
export const CREATE_GAME = gql`
    mutation createGame($gameName: String!) {
        createGame(data: {name: $gameName}) {
            id
            name
        }
    }   
`;

export const createGame = (gameName: any): [any, any] => useMutation<any, CREATE_GAME_VARS>(CREATE_GAME, {
    update(cache, {data: {createGame}}) {
        const {games} = cache.readQuery({query: GET_GAMES});
        cache.writeQuery({
            query: GET_GAMES,
            data: {games: games.concat([createGame])}
        });
    },
    variables: {gameName}
});

export interface UPDATE_GAME_VARS {
    gameData: any;
    gameId: string;
}

export const UPDATE_GAME = gql`
    mutation setGame($gameData: GameUpdateInput!, $gameId: ID) {
        updateGame(
            data: $gameData
            where: {id: $gameId}
        ) {
            id
            name
            notes
        }
    }
`;

export const DELETE_GAME = gql`
    mutation deleteGame($gameId: ID) {
        deleteGame(where: {id: $gameId}) {
            id
            name
        }
    }
`;

export const SUBSCRIBE_NEW_GAME  = gql`
  subscription newGame($ownerId: ID!) {
      game(where: {mutation_in: CREATED, node: {
          owner: {id: $ownerId}
      }}) {
          mutation
          node {
              id
              name
          }
      }
  } 
`;

export const SUBSCRIBE_DELETE_GAME  = gql`
  subscription deleteGame {
      game(where: {mutation_in: DELETED}) {
          mutation
          previousValues {
              id
          }
      }
  } 
`;

export const SUBSCRIBE_UPDATED_GAME  = gql`
  subscription updatedGame {
      game(where: {mutation_in: UPDATED}) {
          mutation
          updatedFields
          node {
              id
              name
          }
      }
  } 
`;

