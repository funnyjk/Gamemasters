import {gql} from "apollo-boost";

export interface GET_PLAYER_VARS {
    playerId: string;
}
export const GET_PLAYER = gql`
    query getPlayer($playerId: ID!) {
        player(where:{id: $playerId}) {
            id
            name
            pic
        }
    }

`;

export interface CREATE_PLAYER_VARS {
    playerName: string;
}

export const CREATE_PLAYER = gql`
    mutation createPlayer($playerName: String!) {
        createPlayer(data: {name: $playerName}) {
            id
            name
            pic
            tournaments {
                tournament {
                    id
                    name
                }
            }
        }
    }
`;

export interface UPDATE_PLAYER_VARS {
    playerData: any;
    playerId: string;
}

export const UPDATE_PLAYER = gql`
    mutation updatePlayer($playerData: PlayerUpdateInput!, $playerId: ID) {
        updatePlayer(
            data: $playerData
            where: {id:$playerId}
        ) {
            id
            name
            pic
        }
    }
`;

export interface DELETE_PLAYER_VARS {
    playerId: string;
}

export const DELETE_PLAYER = gql`
    mutation deletePlayer($playerId: ID!) {
        deletePlayer(
            where: {
                id: $playerId
            }
        ) {
            id
        }
    }
`;