import {gql} from "apollo-boost";
import {SessionUpdateInput} from "../../server/database/generated/prisma";

export interface GET_TOURNAMENT_SESSIONS_VARS {
  tournamentId: string;
}
export const GET_TOURNAMENT_SESSIONS = gql`
    query getSessions($tournamentId: ID!) {
        sessions(where: {tournament: {id: $tournamentId}}) {
            id
            name
            game {
                name
            }
            scores {
                id
                score
                player {
                    id
                    player {
                        id
                        name
                    }
                }
            }
        }
    }
`;

export interface GET_SESSION_VARS {
    sessionId: string;
}
export const GET_SESSION = gql`
    query getSession($sessionId: ID!){
        session(where: {id: $sessionId}) {
            id
            name
            game {
                name
            }
            scores {
                id
                score
                player {
                    id
                    player {
                        id
                        name
                    }
                }
            }
        }
    }   
`;

export interface CREATE_SESSION_VARS {
    tournamentId: string;
    gameId: string
    name: string;
}
export const CREATE_SESSION = gql`
    mutation createSession($tournamentId: ID!, $gameId: ID!, $name: String!) {
        createSession(data: {
            name: $name,
            tournament: {connect: {id: $tournamentId}},
            game: {connect: {id: $gameId}}
        }) {
            id
            name
        }
    }
`;

export interface UPDATE_SESSION_VARS {
    sessionData: SessionUpdateInput;
    sessionId: string;
}
export const UPDATE_SESSION = gql`
    mutation updateSession($sessionData: SessionUpdateInput!, $sessionId: ID!) {
        updateSession(
            data: $sessionData
            where: {id: $sessionId}
        ) {
            id
            name
        }
    }
`;

export interface DELETE_SESSION_VARS {
    sessionId: string;
}
export const DELETE_SESSION = gql`
    mutation deleteSession($sessionId: ID!) {
        deleteSession(where: {id: $sessionId}) {
            id
        }
    }
`;

export const SUBSCRIBE_SESSIONS = gql`
  subscription sessionsChanged {
      session(where: {mutation_in: [CREATED, DELETED, UPDATED]}) {
          updatedFields
      }
  } 
`;