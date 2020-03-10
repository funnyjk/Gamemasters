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


export interface GET_TOURNAMENT_OUT {
    tournament: {
        id: string;
        name: string;
        sessions: Array<{
            id: string;
            name: string;
            game: {
                id: string;
                name: string;
            }
        }>
        players: Array<{
            id: string;
            player: {
                id: string;
                name: string;
                pic: string;
            }
        }>
    }
}
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
                game {
                    id
                    name
                }
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



export interface GET_TOURNAMENT_SCORES_VARS {
    tournamentId: string;
}
export const GET_TOURNAMENT_SCORES = gql`
    query getTournScores($tournamentId: ID!) {
        tournament(where: {id: $tournamentId}) {
            id
            players {
                player {
                    name
                }
                scores {
                    score
                    session {
                        game {
                            name
                        }
                    }
                }
            }
        }
    }
`;

export interface GET_TOURNAMENT_GAMES_VARS {
    tournamentId: string;
}
export const GET_TOURNAMENT_GAMES = gql`
    query getTournGames($tournamentId: ID!) {
        tournament(where: {id: $tournamentId}) {
            id
            sessions {
                game {
                    id
                    name
                }
            }
        }
    }
`;
// export const GET_TOURNAMENT_SCORES = gql`
//     query getTourn($tournamentId: ID!) {
//         tournament(where: {id: $tournamentId})
//         {
//             id
//             name
//             players {
//                 id
//                 player {
//                     id
//                     name
//                 }
//                 scores {
//                     id
//                     score
//                     session {
//                         id
//                         game {
//                             id
//                             name
//                         }
//                     }
//                 }
//             }
//         }}
// `;