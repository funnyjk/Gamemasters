import {gql} from "apollo-boost";
import {ScoreUpdateInput, TournamentUpdateInput} from "../../server/database/generated/prisma";

export const GET_TOURNAMENTS = gql`
    query getTournaments {
        tournaments {
            id
            name
            sessions {
                id
                name
            }
            players {
                id
                player {
                    id
                    name
                    pic
                }
            }
        }
    }
`;

export interface GET_TOURNAMENT_VARS {
    tournamentId: string;
}
export const GET_TOURNAMENT = gql`
    query getTournament($tournamentId: ID!) {
        tournament(where:{id: $tournamentId}) {
            id
            name
            sessions {
                id
                name
            }
            players {
                id
                player {
                    id
                    name
                    pic
                }
            }
        }
    }
`;



export interface CREATE_TOURNAMENT_VARS {
  tournamentName: string;
}
export const CREATE_TOURNAMENT  = gql`
    mutation createTournament($tournamentName: String!) {
        createTournament(data: {name: $tournamentName}) {
            id
            name
            sessions {
                id
                name
            }
            players {
                id
                player {
                    id
                    name
                }
            }
        }
    }
`;


export interface UPDATE_TOURNAMENT_VARS {
    tournamentData: TournamentUpdateInput;
    tournamentId: string;
}

export const UPDATE_TOURNAMENT = gql`
    mutation updateTournament($tournamentData: TournamentUpdateInput!, $tournamentId: ID!) {
        updateTournament(
            data: $tournamentData
            where: {id: $tournamentId}
        ) {
            id
            name
        }
    }
`;

export interface DELETE_TOURNAMENT_VARS {
    tournamentId: string;
}
export const DELETE_TOURNAMENT = gql`
    mutation deleteTournament($tournamentId: ID!) {
        deleteTournament(where: {id: $tournamentId}) {
            id
        }
    } 
`;