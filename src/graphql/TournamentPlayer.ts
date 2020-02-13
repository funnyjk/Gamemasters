import {gql} from "apollo-boost";

export interface GET_TOURNAMENTPLAYERS_VARS {
  tournamentId: string;
}
export const GET_TOURNAMENTPLAYERS = gql`
  query getTournamentPlayers($tournamentId: ID!) {
      tournamentPlayers(where: {tournament: {id: $tournamentId}}) {
          id
          tournament {
              id
              name
          }
          player {
              id
              name
          }
      }
  }
`;

export interface GET_TOURNAMENTPLAYER_VARS {
  tournamentPlayerId: string;
}
export const GET_TOURNAMENTPLAYER = gql`
  query getTournamentPlayer($tournamentPlayerId: ID!) {
      tournamentPlayer(where: {id: $tournamentPlayerId}) {
          id
          nickname
          tournament {
              id
              name
          }
          player {
              id
              name
          }
          scores {
              id
              score
              session {
                  id
                  name
                  game {
                      id
                      name
                  }
              }
          }
      }
  }
`;

export const CREATE_TOURNAMENTPLAYER = gql`
    mutation createTournamentPlayer($playerId: ID!, $tournamentId: ID!) {
    createTournamentPlayer(
        data: {
            player: {connect: {id: $playerId}},
            tournament: {connect: {id: $tournamentId}}
        }
    ) {
        id
        tournament {
            id
            name
        }
        player {
            id
            name
            pic
        }
    }
}`;

export const DELETE_TOURNAMENTPLAYER = gql`
    mutation deleteTournamentPlayer($tournamentPlayerId: ID!) {
    deleteTournamentPlayer(
        where: {
            id: $tournamentPlayerId
        }
    ) {
        id
    }
}`;