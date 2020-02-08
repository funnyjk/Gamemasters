import gql from 'graphql-tag';

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
        }
    }
`;

export const CREATE_GAME = gql`
    mutation createGame($gameName: String!) {
        createGame(data: {name: $gameName}) {
            id
            name
        }
    }   
`;

export const UPDATE_GAME = gql`
    mutation setGame($gameData: GameUpdateInput!, $gameId: ID) {
        updateGame(
            data: $gameData
            where: {id: $gameId}
        ) {
            id
            name
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