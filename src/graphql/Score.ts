import {gql} from "apollo-boost";
import {ScoreUpdateInput, SessionUpdateInput} from "../../server/database/generated/prisma";

export interface GET_SCORE_VARS {
  scoreId: string;
}

export const GET_SCORE = gql`
    query getScore($scoreId: ID!){
        score(where: {id: $scoreId}) {
            id
            score
            session {
                id
                tournament {
                    id
                }
            }
            player {
                id
                player {
                    name
                }
            }
        }
    }
`;

export interface UPDATE_SCORE_VARS {
    scoreData: ScoreUpdateInput;
    scoreId: string;
}

export const UPDATE_SCORE = gql`
    mutation updateScore($scoreData: ScoreUpdateInput!, $scoreId: ID!) {
        updateScore(
            data: $scoreData
            where: {id: $scoreId}
        ) {
            id
            score
        }
    }
`;

export interface CREATE_SCORE_VARS {
    playerId: string;
    sessionId: string;
}
export const CREATE_SCORE = gql`
    mutation createScore($playerId: ID!, $sessionId: ID!) {
        createScore(
            data: {
                player: {connect: {id: $playerId}},
                session: {connect: {id: $sessionId}}
            }
        ) {
            id
            score
        }
    }
`;

export interface DELETE_SCORE_VARS {
    scoreId: string;
}
export const DELETE_SCORE = gql`
    mutation deleteScore($scoreId: ID!) {
        deleteScore(where: {id: $scoreId}) {
            id
        }
    }
`;