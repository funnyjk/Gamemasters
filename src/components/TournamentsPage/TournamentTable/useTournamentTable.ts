import React from 'react';
import {useQuery} from "@apollo/react-hooks";
import {
  GET_TOURNAMENT_GAMES,
  GET_TOURNAMENT_GAMES_VARS,
  GET_TOURNAMENT_SCORES,
  GET_TOURNAMENT_SCORES_VARS
} from "../../../graphql/Tournament";
import _ from "lodash";

type useTournamentTableOutput = [Array<any>, Array<any>];

const useTournamentTable = (tournamentId: string): useTournamentTableOutput => {
  const scoreQuery = useQuery<any, GET_TOURNAMENT_SCORES_VARS>(GET_TOURNAMENT_SCORES, {
    variables: {
      tournamentId
    }
  });

  const gamesQuery = useQuery<any, GET_TOURNAMENT_GAMES_VARS>(GET_TOURNAMENT_GAMES, {
    variables: {
      tournamentId
    }
  });


  let playersList = [];
  if (!scoreQuery.error && !scoreQuery.loading && scoreQuery.data) {
    const playerTournament = scoreQuery.data;
    const {players} = playerTournament.tournament;
    playersList = players.map((player: any) => {
      return {
        name: player.player.name,
        scores: _.groupBy(player.scores, 'session.game.name')
      }
    });
  }

  let uniqGames: any = [];
  if (!gamesQuery.error && !gamesQuery.loading && gamesQuery.data) {
    const gamesData = gamesQuery.data;
    const {sessions} = gamesData.tournament;
    uniqGames = _.uniqBy(sessions, 'game.name');
  }

  return [uniqGames, playersList];
};

export default useTournamentTable;