import React from 'react';
import './styles';

import {useQuery} from "@apollo/react-hooks";
import {
  GET_TOURNAMENT_GAMES,
  GET_TOURNAMENT_GAMES_VARS,
  GET_TOURNAMENT_SCORES,
  GET_TOURNAMENT_SCORES_VARS
} from "../../../graphql/Tournament";
import _ from "lodash";
import {Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import {Simulate} from "react-dom/test-utils";
import play = Simulate.play;
import useTournamentTable from "./useTournamentTable";
interface ITournamentTable {
  tournamentId: string;
}

const TournamentTable = ({tournamentId}: ITournamentTable) => {
  const [uniqGames, playersList] = useTournamentTable(tournamentId);

  if(!playersList.length || !uniqGames.length) return <div>No Scores</div>;

  return <div>
    <Table stickyHeader className={"table--full"}>
    <TableHead >
    <TableRow>
      <TableCell></TableCell>
      {uniqGames.map(({game}: any, k) => {
        return <TableCell key={k} align={"right"}>{game.name}</TableCell>
      })}
    </TableRow>
    </TableHead>
      <TableBody>
    {playersList.map((player: any, k: number) => {
      const {scores} = player;
      return <TableRow key={k}>
        <TableCell>{player.name}</TableCell>
        {uniqGames.map(({game}: any, k) => {
          return <TableCell key={k} align={"right"}>{_.sumBy(scores[game.name], 'score') || 0}</TableCell>;
        })}
      </TableRow>
    })}
      </TableBody>
  </Table>
  </div>
};

export default TournamentTable;